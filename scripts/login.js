window.onload = function() {

    const form = document.querySelector('form');
    const h1 = document.querySelector('form h1');
    const ulErrores = document.querySelector('#errores');
    const errores = []

    form.onsubmit = function(e) {

        if (!validarDatos()) {
            e.preventDefault();
            for (let i = 0; i < errores.length; i++) {
                const error = errores[i];
                ulErrores.innerHTML += `
                    <li> 
                    ${JSON.stringify(error)}
                    </li>
                `
            }
        }
    }

    ulErrores.onclick = () => {
        ulErrores.innerHTML = '';
    }


    function validarDatos() {
        let textos = document.querySelectorAll("input[type=text]");
        let claves = document.querySelectorAll("input[type=password]");

        if (textos[0].value == "")
            errores.push("El nombre es requerido.");

        if (textos[0].value.length < 5)
            errores.push("El nombre ingresado debe ser mas largo.");

        if (claves[0].value !== claves[1].value)
            errores.push("Las claves no coinciden.")

        if (claves[0].value.length < 5)
            errores.push("La clave ingresada debe ser mas larga.")

        if (textos[1].value.indexOf('@') == -1)
            errores.push("El correo ingresado es invalido")


        if (errores.length > 0)
            return false

        return true;

    }
}