window.onload = function() {

    const form = document.querySelector('form');

    form.onsubmit = function(e) {
        e.preventDefault();

        if (validarDatos()) {
            form.submit();
        }
    }

    function validarDatos() {
        let textos = document.querySelectorAll("input[type=text]");
        let claves = document.querySelectorAll("input[type=password]");

        if (textos[0].value == "") {
            alert("El nombre es requerido.");
        } else if (textos[0].value.length < 5) {
            alert("El nombre ingresado debe ser mas largo.");
        } else if (claves[0].value !== claves[1].value) {
            alert("Las claves no coinciden.")
        } else if (claves[0].value.length < 5) {
            alert("La clave ingresada debe ser mas larga.")
        } else if (textos[1].value.indexOf('@') == -1) {
            alert("El correo ingresado es invalido")
        }

        return true;
    }
}