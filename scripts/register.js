window.onload = function() {

    const inputFirstName = document.querySelector("#firstName");
    const inputLastName = document.querySelector("#lastName");
    const inputPassword = document.querySelector("#password");
    const inputEmail = document.querySelector("#email");
    const form = document.querySelector("#formRegister");

    let errores = {};
    let usuario = {};

    form.onsubmit = function(e) {
        e.preventDefault();
        validarDatos();

        if (Object.keys(errores).length !== 0) {
            for (const tipo in errores)
                document.getElementById(`small-${tipo}`).innerHTML += `
                    ${errores[tipo]}
                    `;

            errores = {};
        } else {
            registrarUsuario(inputFirstName.value, inputLastName.value, inputEmail.value, inputPassword.value);
        }
    };

    function registrarUsuario(nombre, apellido, email, clave) {
        const usuario = {
            firstName: nombre,
            lastName: apellido,
            email: email,
            password: clave
        }

        const urlRegister = "https://ctd-todo-api.herokuapp.com/v1/users";

        fetch(urlRegister, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            })
            .then((res) => res.json())
            .then((responseAPI) => {
                if (responseAPI.jwt) {
                    sessionStorage.setItem("jwt", responseAPI.jwt);
                    sessionStorage.setItem("email", usuario.email);
                    window.location.href = "lista-tareas.html";
                } else {
                    alert(responseAPI);
                }
            });

    }

    function validarDatos() {
        const inputRePassword = document.querySelector("#repassword");

        const smalls = document.querySelectorAll("small");
        for (let small of smalls) small.innerHTML = "";

        if (inputFirstName.value.length < 3)
            errores.firstName = "El nombre ingresado es muy corto.";

        if (inputFirstName.value == "") errores.firstName = "El nombre es requerido. ";

        if (inputLastName.value.length < 2)
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

    }
};