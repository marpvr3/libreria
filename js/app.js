//slider
window.swiper = new Swiper('.slider-contenedor', {
    slideClass: 'slider-sl',
    createElements: true,
    autoplay: {
        delay: 4000
    },
    loop: true,
    navigation: true
})

//carrito abrir y cerrar
const Btncarrito = document.querySelector('.carrito-icono');
const contenidocart = document.querySelector('.container-pcar');

Btncarrito.addEventListener('click', () => {
    contenidocart.classList.toggle('cart')
})

//Carrito de compras funcionando

const carrito = document.querySelector('.carrito-productos');
const productos = document.querySelector('#libros');
const productoInfo = document.querySelector('.productos-cart');
const vaciarCarrito = document.querySelector('.vaciar-carrito');
const totalproductos = document.querySelector('.total-pagar');
const contador = document.querySelector('#contador-productos');
let articulosLibros = [];

eventos();
function eventos() {
    productos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarLibro);

    document.addEventListener('DOMContentLoaded', () => {
        articulosLibros = JSON.parse(localStorage.getItem('carrito')) || [];

        mostrarProductos();
    })

    vaciarCarrito.addEventListener('click', vaciarCarro);

}


function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('boton-agregar')){
        const libro = e.target.parentElement.parentElement;
        Datoslibro(libro);

    }
}

function eliminarLibro(e) {
    if(e.target.classList.contains('cerrar')){
        const libroId = e.target.getAttribute('data-id');

        articulosLibros = articulosLibros.filter(libro => libro.id !== libroId);
        
        mostrarProductos();
    }
}

function vaciarCarro(e) {
    articulosLibros = [];

    limpiarCarrito();
    mostrarProductos();
}

function Datoslibro(libro) {

    const contenidoLibro = {
        titulo: libro.querySelector('h4').textContent,
        precio: libro.querySelector('.precio').textContent,
        cantidad: 1,
        id: libro.querySelector('a').getAttribute('data-id'),
    }

    const existe = articulosLibros.some(libro => libro.id === contenidoLibro.id);
if(existe) {
    const libros = articulosLibros.map(libro => {
        if(libro.id === contenidoLibro.id) {
            libro.cantidad++;
            return libro;
        }else{
            return libro;
        }
    })
}else{
    articulosLibros = [...articulosLibros, contenidoLibro];
}

mostrarProductos();
}

function mostrarProductos() {
    limpiarCarrito();

    let total = 0;
    let cantidadProductos = 0;

    articulosLibros.forEach( libro => {
        const contenido = document.createElement('div');
        contenido.innerHTML = `
        <div class="productos-carrito">
        <p class="titulo-cart">${libro.titulo}</p>
                                        <span class="precio-producto">${libro.precio}</span>
                                        <span class="cantidad-producto">${libro.cantidad}</span>
                                        <svg data-id="${libro.id}" class="cerrar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                          </svg>
                                    </div>
        `

        productoInfo.appendChild(contenido);
        total = total + parseInt(libro.cantidad * libro.precio.slice(1));
        cantidadProductos = cantidadProductos + libro.cantidad;

    });
    totalproductos.innerText = `$${total}`
    contador.innerText = cantidadProductos;

    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosLibros))
}

function limpiarCarrito() {
    const elementosCarrito = document.querySelectorAll('.productos-carrito');
    elementosCarrito.forEach(elemento => elemento.remove());
}




