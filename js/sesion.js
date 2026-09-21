console.log("sesion.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {

    const tipoUsuario = document.getElementById("tipoUsuario");
    const labelIdentificador = document.getElementById("label-identificador");
    const identificador = document.getElementById("identificador");
    const tituloSesion = document.getElementById("titulo-sesion");
    const descripcionSesion = document.getElementById("descripcion-sesion");
    const registro = document.getElementById("registro");
    const recuperar = document.getElementById("recuperar");
    const formulario = document.getElementById("form-sesion");

    function actualizarFormulario() {

        if (tipoUsuario.value === "admin") {

            tituloSesion.textContent = "Acceso de administrador";

            descripcionSesion.textContent =
                "Acceso al panel de administración de Coki Librería";

            labelIdentificador.textContent = "Usuario:";

            identificador.type = "text";
            identificador.name = "usuario";
            identificador.autocomplete = "username";
            identificador.placeholder = "Ingresá tu usuario";

            registro.classList.add("d-none");
            recuperar.classList.add("d-none");

        } else {

            tituloSesion.textContent = "Acceso de usuario";

            descripcionSesion.textContent =
                "Ingresá a tu cuenta de Coki Librería";

            labelIdentificador.textContent = "Correo electrónico:";

            identificador.type = "email";
            identificador.name = "email";
            identificador.autocomplete = "email";
            identificador.placeholder = "Ingresá tu correo electrónico";

            registro.classList.remove("d-none");
            recuperar.classList.remove("d-none");
        }
    }

    tipoUsuario.addEventListener("change", actualizarFormulario);

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const tipo = tipoUsuario.value;

        localStorage.setItem("tipoUsuario", tipo);

        if (tipo === "admin") {
            window.location.href = "PanelAdmin.html";
        } else {
            window.location.href = "index.html";
        }
    });

    actualizarFormulario();
});
