/* ============================================================
   COKI LIBRERÍA — libreria.js
   Catálogo de productos de la página libreria.html

   Índice
   1. Catálogo de productos (array de datos)
   2. Configuración y estado de la pantalla
   3. Referencias al DOM
   4. Funciones auxiliares (precio y texto)
   5. Filtrado por búsqueda
   6. Dibujado de la grilla y del contador
   7. Dibujado de la paginación
   8. Carrito (localStorage + badge + aviso flotante)
   9. Eventos (delegación) e inicio
   ============================================================ */


/* ============================================================
   1. CATÁLOGO DE PRODUCTOS
   Los 24 productos que muestra la página. Cada uno tiene un id
   único, que es lo que después se guarda en el carrito.
   ============================================================ */
const productos = [
    { id: 1,  nombre: 'Lapicera BIC Trazo Fino',              precio: 900,  categoria: 'Escritura',  imagen: 'lapicerabic.png',       descripcion: 'Tinta de trazo fino para una escritura precisa.' },
    { id: 2,  nombre: 'Lapicera Faber-Castell',               precio: 800,  categoria: 'Escritura',  imagen: 'lapicerafaber.png',     descripcion: 'Bolígrafo ergonómico de secado rápido.' },
    { id: 3,  nombre: 'Felpón Doble Punta',                   precio: 1500, categoria: 'Marcadores', imagen: 'felponpdoble.png',      descripcion: 'Marcador con punta fina y gruesa.' },
    { id: 4,  nombre: 'Cuaderno Tapa Dura Grande',            precio: 7000, categoria: 'Cuadernos',  imagen: 'cuadernoABC.png',       descripcion: 'Cuaderno universitario resistente para uso diario.' },
    { id: 5,  nombre: 'Lápiz / Marcador de Pizarra',          precio: 1500, categoria: 'Marcadores', imagen: 'lapizpizz.png',         descripcion: 'Tinta borrable en seco para pizarras blancas.' },
    { id: 6,  nombre: 'Barrita de Silicona Fina',             precio: 500,  categoria: 'Adhesivos',  imagen: 'barradesil.png',        descripcion: 'Adhesivo térmico para trabajos y manualidades.' },
    { id: 7,  nombre: 'Silicona Líquida',                     precio: 2500, categoria: 'Adhesivos',  imagen: 'siliconaliq.png',       descripcion: 'Pegamento transparente ideal para goma EVA y tela.' },
    { id: 8,  nombre: 'Crayones de Colores',                  precio: 3000, categoria: 'Arte',       imagen: 'crayones.png',          descripcion: 'Crayones de cera para colorear y dibujar.' },
    { id: 9,  nombre: 'Hojas Cuadriculadas x24 Éxito',        precio: 3500, categoria: 'Papelería',  imagen: 'hojaexito24.png',       descripcion: 'Repuesto de hojas con bordes reforzados.' },
    { id: 10, nombre: 'Felpón Permanente',                    precio: 1500, categoria: 'Marcadores', imagen: 'felponper.png',         descripcion: 'Marcador indeleble resistente al agua para varias superficies.' },
    { id: 11, nombre: 'Cuaderno Chico Espiral',               precio: 1500, categoria: 'Cuadernos',  imagen: 'cuadernoc.png',         descripcion: 'Libreta de tamaño compacto para anotaciones rápidas.' },
    { id: 12, nombre: 'Papel Glasé',                          precio: 400,  categoria: 'Papelería',  imagen: 'papelglace.png',        descripcion: 'Hojas de colores lustradas para recortar y plegar.' },
    { id: 13, nombre: 'Lápiz Negro BIC',                      precio: 400,  categoria: 'Escritura',  imagen: 'lapiznegrob.png',       descripcion: 'Lápiz de grafito resistente y fácil de borrar.' },
    { id: 14, nombre: 'Juego de Geometría',                   precio: 3000, categoria: 'Geometría',  imagen: 'juegodeg.png',          descripcion: 'Set de regla, escuadras y transportador.' },
    { id: 15, nombre: 'Compás Escolar',                       precio: 1000, categoria: 'Geometría',  imagen: 'compas.png',            descripcion: 'Herramienta para trazar arcos y circunferencias.' },
    { id: 16, nombre: 'Líquido Corrector',                    precio: 1000, categoria: 'Escritura',  imagen: 'liquidocorrector.png',  descripcion: 'Corrector blanco de secado rápido.' },
    { id: 17, nombre: 'Fibras / Felpas de Colores',           precio: 1000, categoria: 'Arte',       imagen: 'felpasdecolores.png',   descripcion: 'Marcadores lavables para pintar y subrayar.' },
    { id: 18, nombre: 'Lápices de Colores Grandes',           precio: 1500, categoria: 'Arte',       imagen: 'lapicesdecolores.png',  descripcion: 'Lápices de madera de mina suave e intensa.' },
    { id: 19, nombre: 'Plasticola',                           precio: 2000, categoria: 'Adhesivos',  imagen: 'plasticola.png',        descripcion: 'Adhesivo sintético lavable para uso escolar.' },
    { id: 20, nombre: 'Tijera Escolar',                       precio: 800,  categoria: 'Útiles',     imagen: 'tijera.png',            descripcion: 'Tijera con punta redondeada para corte seguro.' },
    { id: 21, nombre: 'Boligoma / Pegamento Sintético',       precio: 2000, categoria: 'Adhesivos',  imagen: 'boligoma.png',          descripcion: 'Adhesivo sintético lavable para papel y cartón.' },
    { id: 22, nombre: 'Cinta de Papel / Enmascarar',          precio: 1500, categoria: 'Adhesivos',  imagen: 'cintadepapel.png',      descripcion: 'Cinta adhesiva de papel de fácil despegue sin dañar superficies.' },
    { id: 23, nombre: 'Cinta Adhesiva Transparente / Scotch', precio: 1500, categoria: 'Adhesivos',  imagen: 'cintasco.png',          descripcion: 'Cinta adhesiva transparente multiuso para pegar y embalar.' },
    { id: 24, nombre: 'Portaminas',                           precio: 1500, categoria: 'Escritura',  imagen: 'portaminas.png',        descripcion: 'Portaminas mecánico ideal para escritura fina y dibujo técnico.' }
];


/* ============================================================
   2. CONFIGURACIÓN Y ESTADO DE LA PANTALLA
   ============================================================ */
const PRODUCTOS_POR_PAGINA = 6;          // 24 productos = 4 páginas
const CLAVE_CARRITO = 'coki-carrito';    // clave de localStorage

let paginaActual = 1;                    // página que se está viendo
let textoBuscado = '';                   // lo que el usuario escribió


/* ============================================================
   3. REFERENCIAS AL DOM
   ============================================================ */
const inputBusqueda = document.getElementById('productSearch');
const grillaProductos = document.getElementById('productList');
const contadorResultados = document.getElementById('productCount');
const navPaginacion = document.getElementById('productPagination');
const badgeCarrito = document.getElementById('cartCountBadge');
const avisoCarrito = document.getElementById('cartToast');
const avisoCarritoTexto = document.getElementById('cartToastText');


/* ============================================================
   4. FUNCIONES AUXILIARES (precio y texto)
   ============================================================ */

/* Muestra el precio en pesos argentinos con punto de miles: "$ 8.500" */
function formatearPrecio(precio) {
    return '$ ' + precio.toLocaleString('es-AR');
}

/* Pasa un texto a minúsculas y le saca los tildes, así "lapiz"
   también encuentra "Lápiz". NFD separa la letra del tilde y el
   reemplazo borra los tildes sueltos. */
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
}


/* ============================================================
   5. FILTRADO POR BÚSQUEDA
   Busca en el nombre, la categoría y la descripción.
   ============================================================ */
function filtrarProductos() {
    const buscado = normalizarTexto(textoBuscado.trim());

    // Sin texto escrito se muestran todos los productos.
    if (buscado === '') {
        return productos;
    }

    return productos.filter(function (producto) {
        const contenido = normalizarTexto(
            producto.nombre + ' ' + producto.categoria + ' ' + producto.descripcion
        );

        return contenido.includes(buscado);
    });
}


/* ============================================================
   6. DIBUJADO DE LA GRILLA Y DEL CONTADOR
   ============================================================ */

/* Arma el HTML de una tarjeta de producto (componente card de Bootstrap
   con las clases coki- de la marca encima). */
function plantillaProducto(producto) {
    return `
        <article class="card coki-product-card">
            <div class="coki-product-card__media">
                <img
                    src="img/${producto.imagen}"
                    class="card-img-top coki-product-card__img"
                    alt="${producto.nombre} - ${producto.categoria} en Coki Librería"
                    loading="lazy"
                />
            </div>

            <div class="card-body coki-product-card__body">
                <p class="card-subtitle coki-product-card__category">${producto.categoria}</p>

                <h3 class="card-title coki-product-card__title">${producto.nombre}</h3>

                <p class="card-text coki-product-card__text">${producto.descripcion}</p>

                <div class="coki-product-card__footer">
                    <span class="coki-product-card__price">${formatearPrecio(producto.precio)}</span>

                    <button
                        type="button"
                        class="btn btn-primary coki-product-card__btn"
                        data-producto-id="${producto.id}"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </article>
    `;
}

/* Dibuja la página actual: contador, tarjetas y paginación. */
function mostrarProductos() {
    const encontrados = filtrarProductos();
    const totalPaginas = Math.ceil(encontrados.length / PRODUCTOS_POR_PAGINA);

    // Si la página guardada ya no existe (por ejemplo, al filtrar), se corrige.
    if (paginaActual > totalPaginas) {
        paginaActual = totalPaginas < 1 ? 1 : totalPaginas;
    }

    // Cuando no hay resultados: mensaje en lugar de tarjetas.
    if (encontrados.length === 0) {
        contadorResultados.textContent = 'No encontramos productos para tu búsqueda.';
        grillaProductos.innerHTML = `
            <p class="coki-product-empty">
                Probá con otra palabra, por ejemplo "lápiz", "cuaderno" o "adhesivos".
            </p>
        `;
        navPaginacion.innerHTML = '';
        return;
    }

    // Recorte de los 6 productos que le tocan a la página actual.
    const desde = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const hasta = desde + PRODUCTOS_POR_PAGINA;
    const visibles = encontrados.slice(desde, hasta);

    contadorResultados.textContent =
        `Mostrando ${desde + 1}-${desde + visibles.length} de ${encontrados.length} productos`;

    // map() arma el HTML de cada tarjeta y join('') las une en un solo texto.
    grillaProductos.innerHTML = visibles.map(plantillaProducto).join('');

    mostrarPaginacion(totalPaginas);
}


/* ============================================================
   7. DIBUJADO DE LA PAGINACIÓN
   Componente pagination de Bootstrap: « | números | »
   ============================================================ */
function mostrarPaginacion(totalPaginas) {
    // Con una sola página no hace falta mostrar los botones.
    if (totalPaginas <= 1) {
        navPaginacion.innerHTML = '';
        return;
    }

    let html = '<ul class="pagination coki-pagination">';

    // Flecha anterior (apagada si ya estamos en la primera página).
    html += `
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
            <button type="button" class="page-link" data-pagina="${paginaActual - 1}" aria-label="Página anterior">&laquo;</button>
        </li>
    `;

    // Un botón por cada página, con la actual destacada.
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
        html += `
            <li class="page-item ${pagina === paginaActual ? 'active' : ''}">
                <button type="button" class="page-link" data-pagina="${pagina}">${pagina}</button>
            </li>
        `;
    }

    // Flecha siguiente (apagada si ya estamos en la última página).
    html += `
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
            <button type="button" class="page-link" data-pagina="${paginaActual + 1}" aria-label="Página siguiente">&raquo;</button>
        </li>
    `;

    html += '</ul>';

    navPaginacion.innerHTML = html;
}


/* ============================================================
   8. CARRITO (localStorage + badge + aviso flotante)
   Acá sólo se guarda el producto; la pantalla del carrito la
   arma otra parte del proyecto.
   ============================================================ */

/* Lee el carrito guardado. Si todavía no hay nada, devuelve una lista vacía. */
function leerCarrito() {
    const guardado = localStorage.getItem(CLAVE_CARRITO);

    return guardado ? JSON.parse(guardado) : [];
}

/* Guarda el carrito como texto JSON. */
function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

/* Suma todas las cantidades y las muestra en el número del navbar. */
function actualizarBadgeCarrito() {
    const carrito = leerCarrito();

    const total = carrito.reduce(function (suma, item) {
        return suma + item.cantidad;
    }, 0);

    badgeCarrito.textContent = total;
}

/* Muestra abajo a la derecha el aviso de "producto agregado". */
function mostrarAviso(nombreProducto) {
    avisoCarritoTexto.textContent = `Agregaste "${nombreProducto}" al carrito.`;

    // Componente toast de Bootstrap (por eso este script va después del bundle).
    const toast = new bootstrap.Toast(avisoCarrito, { delay: 2500 });
    toast.show();
}

/* Agrega un producto: si ya estaba, le suma 1 a la cantidad. */
function agregarAlCarrito(idProducto) {
    const producto = productos.find(function (item) {
        return item.id === idProducto;
    });

    if (!producto) {
        return;
    }

    const carrito = leerCarrito();

    const yaEstaba = carrito.find(function (item) {
        return item.id === producto.id;
    });

    if (yaEstaba) {
        yaEstaba.cantidad = yaEstaba.cantidad + 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarBadgeCarrito();
    mostrarAviso(producto.nombre);
}


/* ============================================================
   9. EVENTOS (delegación) E INICIO
   ============================================================ */

/* Buscador en vivo: filtra mientras se escribe y vuelve a la página 1. */
inputBusqueda.addEventListener('input', function (evento) {
    textoBuscado = evento.target.value;
    paginaActual = 1;

    mostrarProductos();
});

/* Delegación de eventos: un solo listener en la grilla atiende los
   botones "Agregar" de todas las tarjetas, incluso las que se dibujan
   después al cambiar de página. */
grillaProductos.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.coki-product-card__btn');

    if (!boton) {
        return;
    }

    agregarAlCarrito(Number(boton.dataset.productoId));
});

/* Delegación de eventos: un solo listener para toda la paginación. */
navPaginacion.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.page-link');

    if (!boton) {
        return;
    }

    // Los botones de una página apagada (« o » en los extremos) no hacen nada.
    if (boton.closest('.page-item').classList.contains('disabled')) {
        return;
    }

    paginaActual = Number(boton.dataset.pagina);

    mostrarProductos();
    grillaProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* Dibujado inicial de la pantalla. */
mostrarProductos();
actualizarBadgeCarrito();
