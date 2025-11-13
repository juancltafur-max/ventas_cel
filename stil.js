const productos = [
    { id: 1, nombre: "Smartphone Modelo X", descripcion: "Potente procesador, cámara 4K, 128GB.", precio: 599.99, imagen: "placeholder_celular.jpg" },
    { id: 2, nombre: "Gama Media Pro", descripcion: "Batería de larga duración, gran pantalla.", precio: 349.50, imagen: "placeholder_celular.jpg" },
    { id: 3, nombre: "Económico Lite", descripcion: "Ideal para el día a día, ligero.", precio: 199.00, imagen: "placeholder_celular.jpg" },
    // Agrega más productos aquí...
];

let carrito = [];

// 2. Referencias del DOM
const listaProductos = document.getElementById('lista-productos');
const verCarritoBtn = document.getElementById('ver-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarModalBtn = document.querySelector('.cerrar-modal');
const itemsCarritoUl = document.getElementById('items-carrito');
const totalCarritoSpan = document.getElementById('total-carrito');
const contadorCarritoSpan = document.getElementById('contador-carrito');

// 3. Funciones Principales

// Renderiza los productos en la vista
function renderizarProductos() {
    listaProductos.innerHTML = ''; // Limpiar la lista
    productos.forEach(producto => {
        const productoHTML = `
            <article class="producto" data-id="${producto.id}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <span class="precio">$${producto.precio.toFixed(2)}</span>
                <button class="agregar-carrito" data-producto-id="${producto.id}">Añadir al Carrito</button>
            </article>
        `;
        listaProductos.innerHTML += productoHTML;
    });

    // Añadir el evento 'click' a los nuevos botones
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}

// Añade un producto al carrito
function agregarAlCarrito(e) {
    const productoId = parseInt(e.target.dataset.productoId);
    const productoEncontrado = productos.find(p => p.id === productoId);

    if (productoEncontrado) {
        const itemExistente = carrito.find(item => item.id === productoId);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...productoEncontrado, cantidad: 1 });
        }
        actualizarCarrito();
    }
}

// Actualiza la vista del carrito (modal) y el contador
function actualizarCarrito() {
    itemsCarritoUl.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const li = document.createElement('li');
        li.textContent = `${item.nombre} x${item.cantidad} - $${subtotal.toFixed(2)}`;
        itemsCarritoUl.appendChild(li);
    });

    totalCarritoSpan.textContent = `$${total.toFixed(2)}`;
    
    // Contar items únicos para el contador del encabezado
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarritoSpan.textContent = totalItems;
}

// 4. Event Listeners para el Modal
verCarritoBtn.addEventListener('click', () => {
    actualizarCarrito(); // Asegurarse de que el modal esté al día
    modalCarrito.style.display = 'block';
});

cerrarModalBtn.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

// Cerrar el modal haciendo clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modalCarrito) {
        modalCarrito.style.display = 'none';
    }
});

// Botón de Finalizar Compra (Ejemplo simple)
document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('¡Compra finalizada con éxito! Total: ' + totalCarritoSpan.textContent);
        carrito = []; // Vaciar el carrito
        modalCarrito.style.display = 'none';
        actualizarCarrito();
    } else {
        alert('El carrito está vacío.');
    }
});

// 5. Inicialización
document.addEventListener('DOMContentLoaded', renderizarProductos);