window.onload = function() {

    const form = document.querySelector("form");
    const ulErrores = document.querySelector("#errores");
    let errores = {};
    let data = {
        firstName: "Adrian",
        lastName: "Felipe",
        email: "adrianfelipe@gmail.com",
        password: "CLaveFalsa*123",
    };

    form.onsubmit = function(e) {
        let url = "https://ctd-todo-api.herokuapp.com/v1/users";

        validarDatos();

        if (Object.keys(errores).length !== 0) {
            e.preventDefault();
            for (const tipo in errores)
                document.getElementById(`small-${tipo}`).innerHTML += `
                    <small>${errores[tipo]}</small>
                    `;

            errores = {};
        } else {
            cargarDatos();

            fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    localStorage.setItem("respuesta", response)
                    form.submit()
                });


        }
    };

    function cargarDatos() {
        const [nombre, mail] = document.querySelectorAll("input[type=text]");
        const pass = document.querySelector("input[type=password]");

        data.firstName = nombre.value;
        data.email = mail.value;
        data.password = pass.value;
    }

    function crearPropiedad(key, object) {
        if (!object.hasOwnProperty(key)) object[key] = "";
    }

    function validarDatos() {
        const [nombre, mail] = document.querySelectorAll("input[type=text]");
        const [pass, rePass] = document.querySelectorAll("input[type=password]");

        const smalls = document.querySelectorAll("small");
        for (let small of smalls) small.innerHTML = "";

        if (nombre.value.length < 5)
            errores.nombre = "El nombre ingresado es muy corto.";

        if (nombre.value == "") errores.nombre = "El nombre es requerido. ";

        if (pass.value.length < 5)
            errores.pass = "La contraseña ingresada es muy corta.";

        if (pass.value == "") errores.pass = "La contraseña es requerida. ";

        if (pass.value !== rePass.value)
            errores.rePass = "Las claves no coinciden.";

        const mailRegExp =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const testMail = mail.value.length === 0 || !mailRegExp.test(mail.value);

        if (testMail) errores["mail"] = "El correo ingresado es invalido.";

        console.log(JSON.stringify(errores));
    }
};