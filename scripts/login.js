if (sessionStorage.getItem("jwt")) {
    window.location.href = "index.html";
}

window.addEventListener("load", function() {
    const formLogin = document.querySelector("#formLogin");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");
    const urlLogin = "https://ctd-todo-api.herokuapp.com/v1/users/login";

    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();
        iniciarSesion(inputEmail.value, inputPassword.value);
    })


    function iniciarSesion(emailUsuario, passwordUsuario) {
        const datos = {
            email: emailUsuario,
            password: passwordUsuario
        }
        fetch(urlLogin, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(datos)
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(responseAPI) {
                if (responseAPI.jwt) {
                    sessionStorage.setItem("jwt", responseAPI.jwt);
                    window.location.href = "index.html";
                } else {
                    alert(responseAPI);
                }
            })
    }

})