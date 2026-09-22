const CLAVE_CARRITO_PANEL = 'coki-carrito';

function leerCarritoCompartido() {
    const guardado = localStorage.getItem(CLAVE_CARRITO_PANEL);

    if (!guardado) {
        return [];
    }

    try {
        return JSON.parse(guardado);
    } catch (error) {
        localStorage.removeItem(CLAVE_CARRITO_PANEL);
        return [];
    }
}

function guardarCarritoCompartido(carrito) {
    localStorage.setItem(CLAVE_CARRITO_PANEL, JSON.stringify(carrito));
}

function formatearPrecioCarrito(precio) {
    return '$ ' + precio.toLocaleString('es-AR');
}

function crearPanelCarrito() {
    const panel = document.createElement('aside');
    panel.className = 'coki-cart-panel';
    panel.setAttribute('aria-labelledby', 'cokiCartTitle');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
        <div class="coki-cart-panel__backdrop" data-cart-close></div>
        <div class="coki-cart-panel__content" role="dialog" aria-modal="true">
            <header class="coki-cart-panel__header">
                <h2 id="cokiCartTitle">Tu carrito</h2>
                <button type="button" class="coki-cart-panel__close" data-cart-close aria-label="Cerrar carrito">&times;</button>
            </header>
            <div class="coki-cart-panel__body" id="cokiCartItems"></div>
            <footer class="coki-cart-panel__footer">
                <div class="coki-cart-panel__total">
                    <span>Total</span>
                    <strong id="cokiCartTotal">$ 0</strong>
                </div>
                <button type="button" class="coki-cart-panel__clear" data-cart-clear>
                    Borrar carrito
                </button>
            </footer>
        </div>
    `;

    document.body.append(panel);
    return panel;
}

function crearConfirmacionCarrito() {
    const confirmacion = document.createElement('div');
    confirmacion.className = 'coki-cart-confirm';
    confirmacion.setAttribute('aria-hidden', 'true');
    confirmacion.innerHTML = `
        <div class="coki-cart-confirm__backdrop" data-cart-confirm-cancel></div>
        <div class="coki-cart-confirm__content" role="alertdialog" aria-modal="true" aria-labelledby="cokiCartConfirmTitle">
            <div class="coki-cart-confirm__icon" aria-hidden="true">!</div>
            <h2 id="cokiCartConfirmTitle">¿Borrar carrito?</h2>
            <p>Se eliminarán todos los productos que agregaste.</p>
            <div class="coki-cart-confirm__actions">
                <button type="button" class="coki-cart-confirm__cancel" data-cart-confirm-cancel>Cancelar</button>
                <button type="button" class="coki-cart-confirm__accept" data-cart-confirm-accept>Borrar carrito</button>
            </div>
        </div>
    `;

    document.body.append(confirmacion);
    return confirmacion;
}

function actualizarBadgesCompartidos(carrito) {
    const cantidad = carrito.reduce(function (total, item) {
        return total + Number(item.cantidad || 0);
    }, 0);

    document.querySelectorAll('#cartCountBadge, .coki-offcanvas__cart-icon > span').forEach(function (badge) {
        badge.textContent = cantidad;
    });
}

function dibujarCarrito(panel) {
    const carrito = leerCarritoCompartido();
    const contenedor = panel.querySelector('#cokiCartItems');
    const totalElemento = panel.querySelector('#cokiCartTotal');

    actualizarBadgesCompartidos(carrito);

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="coki-cart-panel__empty">Tu carrito está vacío.</p>';
        totalElemento.textContent = '$ 0';
        return;
    }

    contenedor.innerHTML = carrito.map(function (item) {
        return `
            <article class="coki-cart-item">
                <div>
                    <h3>${item.nombre}</h3>
                    <p>${item.cantidad} x ${formatearPrecioCarrito(item.precio)}</p>
                </div>
                <div class="coki-cart-item__controls">
                    <label for="cartRemoveQuantity-${item.id}">Quitar</label>
                    <input
                        id="cartRemoveQuantity-${item.id}"
                        class="coki-cart-item__quantity"
                        type="number"
                        min="1"
                        max="${item.cantidad}"
                        value="1"
                        data-cart-quantity="${item.id}"
                    />
                    <button type="button" class="coki-cart-item__remove" data-cart-remove="${item.id}">
                        Quitar cantidad
                    </button>
                    <button type="button" class="coki-cart-item__remove-all" data-cart-remove-all="${item.id}">
                        Quitar todo
                    </button>
                </div>
            </article>
        `;
    }).join('');

    const total = carrito.reduce(function (suma, item) {
        return suma + item.precio * item.cantidad;
    }, 0);

    totalElemento.textContent = formatearPrecioCarrito(total);
}

function quitarCantidadDelCarrito(idProducto, cantidad) {
    const carrito = leerCarritoCompartido();
    const item = carrito.find(function (producto) {
        return producto.id === idProducto;
    });

    if (!item) {
        return;
    }

    item.cantidad -= Math.max(1, cantidad);

    guardarCarritoCompartido(carrito.filter(function (producto) {
        return producto.cantidad > 0;
    }));
}

function abrirCarrito(panel) {
    dibujarCarrito(panel);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    panel.querySelector('.coki-cart-panel__close').focus();
}

function cerrarCarrito(panel) {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
}

function abrirConfirmacionCarrito(confirmacion) {
    confirmacion.classList.add('is-open');
    confirmacion.setAttribute('aria-hidden', 'false');
    confirmacion.querySelector('[data-cart-confirm-accept]').focus();
}

function cerrarConfirmacionCarrito(confirmacion) {
    confirmacion.classList.remove('is-open');
    confirmacion.setAttribute('aria-hidden', 'true');
}

document.addEventListener('DOMContentLoaded', function () {
    const panel = crearPanelCarrito();
    const confirmacion = crearConfirmacionCarrito();

    document.addEventListener('click', function (evento) {
        const abrir = evento.target.closest('.coki-navbar__cart, .coki-offcanvas__cart');
        const cerrar = evento.target.closest('[data-cart-close]');
        const quitar = evento.target.closest('[data-cart-remove]');
        const quitarTodo = evento.target.closest('[data-cart-remove-all]');
        const borrarCarrito = evento.target.closest('[data-cart-clear]');
        const cancelarBorrado = evento.target.closest('[data-cart-confirm-cancel]');
        const aceptarBorrado = evento.target.closest('[data-cart-confirm-accept]');

        if (abrir) {
            evento.preventDefault();
            abrirCarrito(panel);
            return;
        }

        if (cerrar) {
            cerrarCarrito(panel);
            return;
        }

        if (cancelarBorrado) {
            cerrarConfirmacionCarrito(confirmacion);
            return;
        }

        if (aceptarBorrado) {
            guardarCarritoCompartido([]);
            cerrarConfirmacionCarrito(confirmacion);
            dibujarCarrito(panel);
            return;
        }

        if (quitar) {
            const idProducto = Number(quitar.dataset.cartRemove);
            const campoCantidad = panel.querySelector(`[data-cart-quantity="${idProducto}"]`);
            const cantidad = Number(campoCantidad.value);

            quitarCantidadDelCarrito(idProducto, Number.isFinite(cantidad) ? cantidad : 1);
            dibujarCarrito(panel);
            return;
        }

        if (quitarTodo) {
            const idProducto = Number(quitarTodo.dataset.cartRemoveAll);
            const carrito = leerCarritoCompartido();
            const item = carrito.find(function (producto) {
                return producto.id === idProducto;
            });

            if (item) {
                quitarCantidadDelCarrito(idProducto, item.cantidad);
            }

            dibujarCarrito(panel);
            return;
        }

        if (borrarCarrito) {
            const carrito = leerCarritoCompartido();

            if (carrito.length === 0) {
                return;
            }

            abrirConfirmacionCarrito(confirmacion);
        }
    });

    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && confirmacion.classList.contains('is-open')) {
            cerrarConfirmacionCarrito(confirmacion);
        } else if (evento.key === 'Escape' && panel.classList.contains('is-open')) {
            cerrarCarrito(panel);
        }
    });

    dibujarCarrito(panel);
});
