const btnLibros = document.querySelector('.categorias-filtros');
const mostrarCategorias = document.querySelector('.contenido-categorias');
const btnClose = document.querySelector('.close');

btnLibros.addEventListener('click', () => {
    mostrarCategorias.classList.toggle('active');
})

mostrarCategorias.addEventListener('click', function(event) {
    event.stopPropagation();
});

btnClose.addEventListener('click', () => {
    mostrarCategorias.classList.remove('active')
})

//desplegar elementos 
const desplegarElementos = document.querySelector('.titulo-icono1');
const desplegarElementosi = document.querySelector('.titulo-icono2');
const desplegarElementosp = document.querySelector('.titulo-icono3');
const desplegarElementosa = document.querySelector('.titulo-icono4');
const mostrarElementos = document.querySelector('#categoria');
const mostrarElementosi = document.querySelector('#idioma');
const mostrarElementosp = document.querySelector('#Precio');
const mostrarElementosa = document.querySelector('#Año');

desplegarElementos.addEventListener('click', () => {
    mostrarElementos.classList.toggle('mostrar');
    console.log(mostrarElementos);
})

desplegarElementosi.addEventListener('click', () => {
    mostrarElementosi.classList.toggle('mostrar');
    console.log(mostrarElementosi);
})

desplegarElementosp.addEventListener('click', () => {
    mostrarElementosp.classList.toggle('mostrar');
    console.log(mostrarElementosp);
})

desplegarElementosa.addEventListener('click', () => {
    mostrarElementosa.classList.toggle('mostrar');
    console.log(mostrarElementosa);
})

//filtrar
const librosfiltrados = document.querySelector('#libros-filtrados');
const categoria = document.querySelector('#categoria');
const idiomas = document.querySelector('#idioma');
const precios = document.querySelector('#Precio');
const Año = document.querySelector('#Año');

const busquedalibros = {
    categoria : '',
    idioma : '',
    Precio : '',
    año : '',
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarLibros(libros);
});

categoria.addEventListener('click', e => {
    busquedalibros.categoria = e.target.id;

    filtrarlibros();
} );

idiomas.addEventListener('click', e => {
    busquedalibros.idioma = e.target.id;

    filtrarlibros();
} );

precios.addEventListener('click', e => {
    busquedalibros.Precio = e.target.id;

        filtrarlibros();
} );

Año.addEventListener('click', e => {
    busquedalibros.año = parseInt(e.target.value);

    filtrarlibros();
} );


function mostrarLibros(libros) {

    limpiarHTML();

    libros.forEach(libro => {
        const libroDocumento = document.createElement('div');
        libroDocumento.className = 'card';
        libroDocumento.innerHTML = `
            <img class="card-img" src="${libro.img}" alt="">
            <div class="info-card">
                <h4>${libro.nombre}</h4>
                <p class="autor-card">${libro.autor}</p>
                <p class="precio">$${libro.Precio}</p>
                <a data-id="${libro.id}" href="#" class="boton-agregar">Agregar al carrito</a>
            </div>`;
        librosfiltrados.appendChild(libroDocumento);
    });
}

function limpiarHTML() {
    while(librosfiltrados.firstChild){
        librosfiltrados.removeChild(librosfiltrados.firstChild);
    }
}

function filtrarlibros() {
    const muestra = libros.filter(filtrarcategoria).filter(filtrarIdioma).filter(filtrarPrecios).filter(filtrarAño)
    
    mostrarLibros(muestra)
}

function filtrarcategoria(libros) {
    const {categoria} = busquedalibros
    if(categoria) {
        return libros.categoria === categoria;
    }
    return libros;
}

function filtrarIdioma(libros) {
    const {idioma} = busquedalibros;
    if(idioma) {
        return libros.idioma === idioma;
    }
    return libros;
}

function filtrarPrecios(libros) {
    const { Precio } = busquedalibros;
    if (Precio) {
        const rangoPrecios = {
            precio1: { min: 0, max: 10 },
            precio2: { min: 10, max: 20 },
            precio3: { min: 20, max: 30 },
            precio4: { min: 30, max: 40 },
            precio5: { min: 40, max: 55 },
        }

        const rango = rangoPrecios[Precio];
        
        return libros.Precio >= rango.min && libros.Precio <= rango.max;
    }
    return libros;
}

function filtrarAño(libros) {
    const {año} = busquedalibros;
    if(año) {
        return libros.año === año;
    }
    return libros;
}

function agregarListenersListas() {
    document.querySelectorAll('ul li').forEach(li => {
        li.addEventListener('click', () => {
            if (!li.classList.contains('selected')) {

                li.classList.add('selected');
            }
        });
    });
}

agregarListenersListas();
