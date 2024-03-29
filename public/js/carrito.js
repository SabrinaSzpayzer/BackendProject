const productosApi = {
    get: () => {
        return fetch('/productos')
            .then(data => data.json())
    }
}

const carritosApi = {
    crearCarrito: () => {
        const options = { method: "POST" }
        return fetch('/carritos', options)
            .then(data => data.json())
    },
    crearCompra: (idCarrito) => {
        const options = { method: "POST" }
        return fetch(`/carritos/${idCarrito}/compra`, options)
            .then(data => data.json())
    },
    getIds: () => {
        return fetch('/carritos')
            .then(data => data.json())
    },
    postProd: (idCarrito, idProd) => {
        const data = { _id: idProd }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(`/carritos/${idCarrito}/productos`, options)
    },
    getProds: idCarrito => {
        return fetch(`/carritos/${idCarrito}/productos`)
            .then(data => data.json())
    },
    deleteProd: (idCarrito, idProducto) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`/carritos/${idCarrito}/productos/${idProducto}`, options)
    }
}

loadComboProductos()

loadComboCarrito()

document.getElementById('btnAgregarAlCarrito').addEventListener('click', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    const idProd = document.getElementById('comboProductos').value
    if (idCarrito && idProd) {
        agregarAlCarrito(idCarrito, idProd)
    } else {
        alert('debe seleccionar un carrito y un producto')
    }
})

document.getElementById('btnCrearCarrito').addEventListener('click', () => {
    carritosApi.crearCarrito()
        .then(({ id }) => {
            loadComboCarrito().then(() => {
                const combo = document.getElementById('comboCarritos')
                combo.value = `${id}`
                combo.dispatchEvent(new Event('change'));
            })
        })
})

document.getElementById('btnFinalizarCompra').addEventListener('click', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    carritosApi.crearCompra(idCarrito)
})

document.getElementById('comboCarritos').addEventListener('change', () => {
    const idCarrito = document.getElementById('comboCarritos').value
    actualizarListaCarrito(idCarrito)
})

function agregarAlCarrito(idCarrito, idProducto) {
    return carritosApi.postProd(idCarrito, idProducto).then(() => {
        actualizarListaCarrito(idCarrito)
    })
}

function quitarDelCarrito(idProducto) {
    const idCarrito = document.getElementById('comboCarritos').value
    return carritosApi.deleteProd(idCarrito, idProducto).then(() => {
        actualizarListaCarrito(idCarrito)
    })
}

function actualizarListaCarrito(idCarrito) {
    return carritosApi.getProds(idCarrito)
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('carrito').innerHTML = html
        })
}

function makeHtmlTable(productos) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (productos.length > 0) {
        html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Foto</th>
                    <th>Categoría</th>
                </tr>`
        for (const prod of productos) {
            html += `
                    <tr>
                    <td>${prod.title}</td>
                    <td>${prod.description}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td>${prod.category}</td>
                    <td><a type="button" onclick="quitarDelCarrito('${prod._id}')">Borrar</a></td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    } else {
        html += `<br><h4>Carrito sin productos</h2>`
    }
    return Promise.resolve(html)
}

function crearOpcionInicial(leyenda) {
    const defaultItem = document.createElement("option")
    defaultItem.value = ''
    defaultItem.text = leyenda
    defaultItem.hidden = true
    defaultItem.disabled = true
    defaultItem.selected = true
    return defaultItem
}

function loadComboProductos() {
    return productosApi.get()
        .then(productos => {
            const combo = document.getElementById('comboProductos');
            combo.appendChild(crearOpcionInicial('Elija un producto'))
            for (const prod of productos) {
                const comboItem = document.createElement("option");
                comboItem.value = prod._id;
                comboItem.text = prod.title;
                combo.appendChild(comboItem);
            }
        })
}

function vaciarCombo(combo) {
    while (combo.childElementCount > 0) {
        combo.remove(0)
    }
}

function loadComboCarrito() {
    return carritosApi.getIds()
        .then(carros => {
            const combo = document.getElementById('comboCarritos');
            vaciarCombo(combo)
            combo.appendChild(crearOpcionInicial('Elija un carrito'))
            for (const carro of carros) {
                const comboItem = document.createElement("option");
                comboItem.value = carro._id;
                comboItem.text = carro._id;
                combo.appendChild(comboItem);
            }
        })
}