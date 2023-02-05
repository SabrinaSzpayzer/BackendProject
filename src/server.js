import express, { query } from 'express';
import handlebars from 'express-handlebars';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';
import config from './config.js';
import routerProducts from './routes/ProductsRoutes.js';
import routerCarritos from './routes/CarritosRoutes.js';
import routerOrders from './routes/OrdersRoutes.js';
import routerChat from './routes/ChatRoutes.js';
import routes from './routes/PagesRoutes.js';
import controllersdb from './connectMongoDb.js';
import User from './userModelsMongoDb.js';
import util from 'util';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import passportlocal from 'passport-local';
const LocalStrategy = passportlocal.Strategy;
import bCrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import minimist from 'minimist';
import { fork } from 'child_process';
import cluster from 'cluster';
import os from 'os';
const numCpu = os.cpus().length;
import compression from 'compression';
import logger from './logger.js';
import sendEmail from '../scripts/email.js';
import multer from 'multer';

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// Multer setup

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/photos");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage })

// Sesiones

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                return done(err);
            };

            if (user) {
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                photo: req.file.filename
            };

            User.create(newUser, (err, userWithId) => {
                if (err) {
                    return done(err);
                }

                let emailBody = `<div><p> New user created: ${newUser.firstName} ${newUser.lastName}</p><p>Email/Username: ${username}</p></div>`
                sendEmail("New user created", "", emailBody)
                
                return done(null, userWithId);
            })
        });
    }
));

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const mongourl = config.mongodb.cnxStr;

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: mongourl,
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: config.TIEMPO_EXPIRACION
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Handlebars

import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '../../public/views/layouts',
        partialsDir: __dirname + '../../public/views/partials'
    })
)

app.set('view engine', 'hbs');
app.set('views', './public/views');

// Routers

app.use('/productos', routerProducts);
app.use('/carritos', routerCarritos);
app.use('/ordenes', routerOrders);
app.use('/chat', routerChat);

routerProducts.use(express.json());
routerProducts.use(express.urlencoded({ extended: true }));

routerCarritos.use(express.json());
routerCarritos.use(express.urlencoded({ extended: true }));

routerOrders.use(express.json());
routerOrders.use(express.urlencoded({ extended: true }));

routerChat.use(express.json());
routerChat.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Contenedor Chat

import ChatDaoFactory from './daos/ChatDaoFactory.js';
const historial = ChatDaoFactory.getDao();

// Contenedor Productos

import ProductosDaoFactory from './daos/ProductosDaoFactory.js';
const product = ProductosDaoFactory.getDao();

// Contenedor Carritos

import CarritosDaoFactory from './daos/CarritosDaoFactory.js';
const carrito = CarritosDaoFactory.getDao();

// Contenedor Ordenes

import OrdenesDaoFactory from './daos/OrdenesDaoFactory.js';
const orden = OrdenesDaoFactory.getDao();

// Router Carritos

routerCarritos.post('/:id/compra', async (req, res) => {
    const { id } = req.params;
    const carritoCompra = await carrito.getById(id);
    let confirmation = `<p>Productos en el carrito: </p>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
        </tr>`;

    for (const prods of carritoCompra.productos) {          
        confirmation += `<tr>
                        <td>${prods._id}></td>
                        <td>${prods.title}</td>
                        <td>${prods.description}</td>
                        <td>$${prods.price}</td>
                        </tr>`
    }
    
    const email = req.user.username;

    if (carritoCompra.productos.length > 1) {
        const estado = "generada";
        await orden.saveOrder(carritoCompra.productos, estado, email);
        sendEmail("Nueva orden de compra de " + req.user.firstName + " " + req.user.lastName + " " + req.user.username + " .", "Productos en el carrito: ", confirmation)
        res.send("Orden generada")
    } else {
        logger.error("Error en la orden, debe seleccionar productos, la misma fue rechazada")
    }
})

// socket

io.on('connection', async socket => {
    logger.info('Nuevo cliente conectado');

    // Productos

    const allProducts = await product.getAll();

    socket.emit('productos', allProducts);
    
    socket.on('new-product', async newProduct => {
        await product.saveProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.category);
        allProducts.push(newProduct);
        io.sockets.emit('productos', allProducts);
    })

    // Mensajes Chat

    const messages = await historial.getAll();
    
    socket.emit('messages', messages);
    
    socket.on('new-message', async data => {
        messages.push(data);
        await historial.saveMsg(data);
        io.sockets.emit('messages', messages);
    })
})

//LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', {
    failureRedirect: '/faillogin'
}), routes.postLogin);
app.get('/faillogin', routes.getFailLogin);

//SIGNUP
app.get('/signup', routes.getSignUp);
app.post('/signup', upload.single("photo"), passport.authenticate('signup', {
    failureRedirect: '/failsignup'
}), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//Home
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.get('/', checkAuthentication, (req, res) => {
    const { user } = req;
    res.render('home', {nombre: user.firstName, photo: req.user.photo, email: user.username});
});

// Carrito

app.get('/carrito', checkAuthentication, (req, res) => {
    res.sendFile('carrito.html', { root: __dirname + "../../public"});
});

// Chat

/* app.get('/chat', async (req, res) => {
    const mensajes = await historial.getAll();
    res.send(mensajes);
});

app.get('/chat/:email', async (req, res) => {
    const { email } = req.params;
    const mensajes = await historial.getAll();
    const mensajeEmail = mensajes.filter(em => em.author.email == email)
    res.send(mensajeEmail);
}); */

//LOGOUT
app.get('/logout', routes.getLogout);

//INFO
app.get('/info', compression(), (req, res) => {
    const argumentos = process.argv.slice(2);
    const plataforma = process.platform;
    const versionNode = process.version;
    const memoria = process.memoryUsage().rss;
    const path = process.execPath;
    const proceso = process.pid;
    const directorio = process.cwd();
    res.render('info', {argumentos: argumentos, plataforma: plataforma, versionNode: versionNode, memoria: memoria, path: path, proceso: proceso, directorio: directorio, numCpu: numCpu});
});

// Server

const options = {
    default: {port: 8080, mode: 'FORK'},
    alias: {p: "port", m: "mode"}
}

if ((minimist(process.argv.slice(2), options).mode == 'CLUSTER') && cluster.isPrimary) {
    controllersdb(config.mongodb.cnxStr, err => {
        if (err) return logger.error('error en conexión de base de datos', err);
        logger.info('BASE DE DATOS CONECTADA');
    });

    logger.info(`Número de procesadores ${numCpu}`);
    logger.info(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    };

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Work ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    controllersdb(config.mongodb.cnxStr, err => {
        if (err) return logger.error('error en conexión de base de datos', err);
        logger.info('BASE DE DATOS CONECTADA');
    
        const connectedServer = httpServer.listen(minimist(process.argv.slice(2), options), () => {
            logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
        });
    });
}