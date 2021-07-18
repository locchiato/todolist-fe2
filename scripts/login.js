if (sessionStorage.getItem("jwt")) {
    window.location.href = "lista-tareas.html";
}
if (localStorage.getItem("email") && localStorage.getItem("password")) {
    iniciarSesion(localStorage.getItem("email"), localStorage.getItem("password"));
}

window.addEventListener("load", function(event) {

    const formLogin = document.querySelector("#formLogin");
    const inputEmail = document.querySelector("#email");
    const inputPassword = document.querySelector("#password");

    let errores = {};

    let status = null;
    let erroresAPI = {};

    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();
        let contador = 0;
        /*   if(inputPassword.value.length < 8){
               errores.passwordLength = "La contraseña debe tener al menos 8 caracteres.";
               contador++;
           }
       */
        //match(/[A-Z]/) devuelve un array si encuentra una mayúscula y null si no la encuentra
        /*  if(inputPassword.value.match(/[A-Z]/)==null){
              errores.passwordUpperCase = "La contraseña debe tener al menos una letra mayúscula.";
              contador++;
          }*/

        if (contador == 0) {
            iniciarSesion(inputEmail.value, inputPassword.value);
        } else {
            renderizarErrores();
        }


    })


})

function iniciarSesion(emailUsuario, passwordUsuario) {
    const urlLogin = "https://ctd-todo-api.herokuapp.com/v1/users/login";
    let datos = {
        email: emailUsuario,
        password: passwordUsuario
    }
    fetch(urlLogin, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(datos)
        })
        .then(function(response) {
            /* status = response.status;
            console.log("status: ", status);
            console.log("response primer then", response); */
            return response.json();
        })
        .then(function(responseAPI) {
            console.log(responseAPI);
            if (responseAPI.jwt) {
                sessionStorage.setItem("jwt", responseAPI.jwt);
                sessionStorage.setItem("email", inputEmail.value);
                window.location.href = "lista-tareas.html";
                // location.replace('/lista-tareas.html');

            } else {
                alert(responseAPI);
            }
            /* if(status!=201){
               erroresAPI.mensaje = responseAPI;
            // alert(responseAPI);
               console.log("status!=201", responseAPI);
           }else{
               console.log("status==201", responseAPI);
               sessionStorage.setItem("jwt", responseAPI.jwt);
             //  window.location.href = "lista-tareas.html";
             location.replace('/lista-tareas.html');
           }*/
        })
        .catch(function(error) {
            console.log(error);
        })
}