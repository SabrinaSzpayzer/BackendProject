BackEnd Proyecto Final

Rutas disponibles:

/ -> Ruta principal. Primero es necesario registrarse en /signup y luego iniciar sesión en /login. Aquí se pueden ver el stock de productos y el chat. Se pueden agregar productos nuevos a la base de datos y enviar mensajes en el chat.

/carrito -> Primero hacer click en el botón "Crear Carrito". Luego, se pueden agregar productos al mismo. Al finalizar la selección, hacer click en el botón "Finalizar Compra" para generar la orden. 

/productos -> Devuelve todos los productos disponibles. 
/productos/:id -> Devuelve un producto por id.
/productos/categoria/:category -> Devuelve los productos de una categoría.

/carritos -> Devuelve todos los carritos creados.
/carritos/:id -> Devuelve un carrito creado por su id.
/carritos/:id/productos -> Devuelve los productos dentro de un carrito creado por su id.

/chat -> Devuelve todos los mensajes del chat.
/chat/:email -> Devuelve todos los mensajes en el chat de un email en particular.

/ordenes -> Devuelve todas las órdenes de compra creadas.
/ordenes/:id -> Devuelve una orden de compra por su id.