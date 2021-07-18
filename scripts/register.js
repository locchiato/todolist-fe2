window.onload = function() {

    const form = document.querySelector("#formRegister");

    let errores = {};
    let data = {};

    let url = "https://ctd-todo-api.herokuapp.com/v1/users";

    form.onsubmit = function(e) {

        validarDatos();

        if (Object.keys(errores).length !== 0) {
            e.preventDefault();
            for (const tipo in errores)
                document.getElementById(`small-${tipo}`).innerHTML += `
                    ${errores[tipo]}
                    `;

            errores = {};
        } else {
            cargarDatos();

            setTimeout(() => {


                fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "firstName": "Leandro",
                            "lastName": "Occhiato",
                            "email": "locchiato16@gmail.com",
                            "password": "CLaveFalsa*123"
                        })
                    })
                    .then((res) => res.json())
                    .catch((error) => console.error("Error:", error))
                    .then((response) => {
                        console.log("mi respuesta:" + response)

                    });

            }, 1000);
            window.location.href = "lista-tareas.html";
        }
    };

    function cargarDatos() {
        const inputFirstName = document.querySelector("#firstName");
        const inputLastName = document.querySelector("#lastName");
        const inputPassword = document.querySelector("#password");
        const inputEmail = document.querySelector("#email");

        data.firstName = inputFirstName.value;
        data.lastName = inputLastName.value;
        data.email = inputEmail.value;
        data.password = inputPassword.value;
    }

    function crearPropiedad(key, object) {
        if (!object.hasOwnProperty(key)) object[key] = "";
    }

    function validarDatos() {

        const inputFirstName = document.querySelector("#firstName");
        const inputLastName = document.querySelector("#lastName");
        const inputPassword = document.querySelector("#password");
        const inputRePassword = document.querySelector("#repassword");
        const inputEmail = document.querySelector("#email");

        const smalls = document.querySelectorAll("small");
        for (let small of smalls) small.innerHTML = "";

        if (inputFirstName.value.length < 5)
            errores.firstName = "El nombre ingresado es muy corto.";

        if (inputFirstName.value == "") errores.firstName = "El nombre es requerido. ";

        if (inputLastName.value.length < 5)
            errores.lastName = "El apellido ingresado es muy corto.";

        if (inputLastName.value == "") errores.lastName = "El apellido es requerido. ";

        if (inputPassword.value.length < 5)
            errores.pass = "La contraseña ingresada es muy corta.";

        if (inputPassword.value == "") errores.pass = "La contraseña es requerida. ";

        if (inputPassword.value !== inputRePassword.value)
            errores.rePass = "Las claves no coinciden.";

        const mailRegExp =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const testMail = inputEmail.value.length === 0 || !mailRegExp.test(inputEmail.value);

        if (testMail) errores.mail = "El correo ingresado es invalido.";

        console.log(JSON.stringify(errores));
    }
};