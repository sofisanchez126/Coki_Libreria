document.addEventListener("DOMContentLoaded", function () {

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    const botonesSesion = document.querySelectorAll(
        '[data-menu-action="login"]'
    );

    const botonesLogout = document.querySelectorAll(
        '[data-menu-action="logout"]'
    );

    function cerrarSesion() {
        localStorage.removeItem("tipoUsuario");
        window.location.href = "Sesion.html";
    }

    function crearConfirmacionSesion() {
        const confirmacion = document.createElement("div");
        confirmacion.className = "coki-session-confirm";
        confirmacion.setAttribute("aria-hidden", "true");
        confirmacion.innerHTML = `
            <div class="coki-session-confirm__backdrop" data-session-confirm-cancel></div>
            <div class="coki-session-confirm__content" role="alertdialog" aria-modal="true" aria-labelledby="sessionConfirmTitle">
                <div class="coki-session-confirm__icon" aria-hidden="true">?</div>
                <h2 id="sessionConfirmTitle">¿Cerrar sesión?</h2>
                <p>Vas a salir de tu cuenta de Coki Librería.</p>
                <div class="coki-session-confirm__actions">
                    <button type="button" class="coki-session-confirm__cancel" data-session-confirm-cancel>Cancelar</button>
                    <button type="button" class="coki-session-confirm__accept" data-session-confirm-accept>Cerrar sesión</button>
                </div>
            </div>
        `;

        document.body.append(confirmacion);

        confirmacion.addEventListener("click", function (event) {
            if (event.target.closest("[data-session-confirm-cancel]")) {
                confirmacion.classList.remove("is-open");
                confirmacion.setAttribute("aria-hidden", "true");
            }

            if (event.target.closest("[data-session-confirm-accept]")) {
                cerrarSesion();
            }
        });

        return confirmacion;
    }

    const confirmacionSesion = crearConfirmacionSesion();

    if (tipoUsuario) {

        botonesSesion.forEach(function (boton) {

            boton.textContent = "Cerrar sesión";

            boton.removeAttribute("href");

            boton.setAttribute("data-menu-action", "logout");

        });

        const botonesCerrarSesion = document.querySelectorAll(
            '[data-menu-action="logout"]'
        );

        botonesCerrarSesion.forEach(function (boton) {

            boton.addEventListener("click", function (event) {

                event.preventDefault();
                confirmacionSesion.classList.add("is-open");
                confirmacionSesion.setAttribute("aria-hidden", "false");
                confirmacionSesion.querySelector("[data-session-confirm-accept]").focus();

            });

        });

    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && confirmacionSesion.classList.contains("is-open")) {
            confirmacionSesion.classList.remove("is-open");
            confirmacionSesion.setAttribute("aria-hidden", "true");
        }
    });
});
