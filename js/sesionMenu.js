document.addEventListener("DOMContentLoaded", function () {

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    const botonesSesion = document.querySelectorAll(
        '[data-menu-action="login"]'
    );

    const botonesLogout = document.querySelectorAll(
        '[data-menu-action="logout"]'
    );

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

                localStorage.removeItem("tipoUsuario");

                window.location.href = "Sesion.html";

            });

        });

    }
});
