// Inicializar carrito desde localStorage si existe
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Lista global de productos
const productos = [
    {
        id: 1,
        name: "Remera Sin Hombros",
        description: "Una remera fresca y cómoda.",
        amount: 20000,
        img: "/assets/img/Ropa (3).jfif"
    },
    {
        id: 2,
        name: "Minifalda con Cinto",
        description: "Minifalda moderna con cinto.",
        amount: 20000,
        img: "/assets/img/Ropa (4).jfif"
    },
    {
        id: 3,
        name: "Remera 2 en 1",
        description: "Remera doble capa con estilo.",
        amount: 20000,
        img: "/assets/img/Ropa4.jfif"
    },
    {
        id: 4,
        name: "Top Flawy Fairytale",
        description: "Top ligero y elegante.",
        amount: 20000,
        img: "/assets/img/Ropa.jfif"
    }
];

// Función para generar los productos en la página
function generarProductos() {
    const contenedorProductos = document.querySelector('.seccion_destacados');

    productos.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.classList.add('producto');
        tarjetaProducto.setAttribute('id', `producto-${producto.id}`);

        tarjetaProducto.innerHTML = `
            <figure>
                <img src="${producto.img}" alt="${producto.name}">
            </figure>
            <div class="info_producto">
                <h2>${producto.name}</h2>
                <p class="price">$${producto.amount}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
                <button onclick="mostrarDescripcion(${producto.id}, this)">Ver más</button>
            </div>
        `;

        contenedorProductos.appendChild(tarjetaProducto);
    });
}

// Función para mostrar u ocultar la descripción ampliada del producto
function mostrarDescripcion(id, boton) {
    const producto = productos.find(prod => prod.id === id);
    const tarjetaProducto = document.getElementById(`producto-${id}`);

    if (tarjetaProducto) {
        let descripcion = tarjetaProducto.querySelector('.descripcion');
        if (!descripcion) {
            // Si la descripción no existe, crear y añadir
            descripcion = document.createElement('p');
            descripcion.textContent = producto.description;
            descripcion.classList.add('descripcion');
            tarjetaProducto.querySelector('.info_producto').appendChild(descripcion);
            boton.textContent = 'Mostrar menos';
        } else {
            // Si la descripción ya existe, alternar su visibilidad
            if (descripcion.style.display === 'none' || descripcion.style.display === '') {
                descripcion.style.display = 'block';
                boton.textContent = 'Mostrar menos';
            } else {
                descripcion.style.display = 'none';
                boton.textContent = 'Ver más';
            }
        }
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id); 
    carrito.push(producto); 
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar carrito en localStorage
    mostrarCarrito();
    actualizarContadorCarrito(); // Llama a actualizar el contador

    // Mostrar mensaje de agregado al carrito 
    const mensaje = document.createElement('div'); 
    mensaje.classList.add('mensaje-carrito'); 
    mensaje.textContent = `${producto.name} ha sido añadido al carrito.`; 
    document.body.appendChild(mensaje); 
    setTimeout(() => { mensaje.remove();
    }, 2000);
}

// Función para mostrar los elementos del carrito 
function mostrarCarrito() { 
    const itemsCarrito = document.getElementById('items-carrito'); 
    itemsCarrito.innerHTML = ''; 

    carrito.forEach(producto => { 
        const item = document.createElement('div'); 
        item.classList.add('item-carrito'); 
        item.innerHTML = ` 
            <p>${producto.name} - $${producto.amount}</p> 
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button> 
        `; 
        itemsCarrito.appendChild(item); 
    }); 
    
    calcularTotal(); 
}

// Función para actualizar el contador del carrito 
function actualizarContadorCarrito() { 
    const contador = document.getElementById('contador_carrito'); 
    contador.textContent = carrito.length; 
} 

// Función para eliminar un producto del carrito 
function eliminarDelCarrito(id) { 
    carrito = carrito.filter(producto => producto.id !== id); 
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar carrito en localStorage
    mostrarCarrito(); 
    actualizarContadorCarrito(); // Llama a actualizar el contador
}

// Función para vaciar el carrito 
function vaciarCarrito() { 
    carrito = []; 
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar carrito en localStorage
    mostrarCarrito(); 
    actualizarContadorCarrito(); // Llama a actualizar el contador
}

// Función para calcular el total del carrito 
function calcularTotal() { 
    const total = carrito.reduce((acc, producto) => acc + producto.amount, 0); 
    document.getElementById('total').textContent = `Total: $${total}`; 
}

// Función para mostrar u ocultar el carrito 
function toggleCarrito() { 
    const carritoElement = document.getElementById('carrito'); 
    if (carritoElement.style.display === 'none' || carritoElement.style.display === '') { 
        carritoElement.style.display = 'block'; 
    } 
    else { 
        carritoElement.style.display = 'none'; 
    } 
}

// Llamar a la función para generar y mostrar los productos
generarProductos();
mostrarCarrito(); // Llamar a mostrarCarrito para cargar los productos del carrito
actualizarContadorCarrito(); // Llamar a actualizar el contador al cargar la página
