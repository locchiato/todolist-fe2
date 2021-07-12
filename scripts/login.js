window.onload = function() {

    const form = document.querySelector('form');
    const ulErrores = document.querySelector('#errores');
    let errores = {};


    form.onsubmit = function(e) {
        validarDatos();

        if (Object.keys(errores).length !== 0) {
            e.preventDefault();
            for (const tipo in errores) 
                    document.getElementById(`small-${tipo}`).innerHTML +=  `
                    <small>${errores[tipo]}</small>
                    `;
        
            errores = {};
            
        } else {
            form.submit();
        }

    }


    function crearPropiedad(key, object) {
        if(!object.hasOwnProperty(key))   object[key] = "";
    }

    function validarDatos() {
        const smalls = document.querySelectorAll('small');
        for(let small of smalls)
            small.innerHTML = '';

        const [ nick, mail ] = document.querySelectorAll("input[type=text]");
        
        const [ pass, rePass ] = document.querySelectorAll("input[type=password]");

        if (nick.value.length < 5)
            errores.nick = "El nick ingresado es muy corto.";

        if (nick.value == "")
            errores.nick = "El nick es requerido. ";
                    
        if (pass.value.length < 5)
            errores.pass = "La contraseña ingresada es muy corta.";

        if (pass.value == "")
            errores.pass = "La contraseña es requerida. ";
        
        if (pass.value !== rePass.value)
            errores.rePass = "Las claves no coinciden.";
            

        const mailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const testMail = mail.value.length === 0 || !mailRegExp.test(mail.value);

        if (testMail)
            errores['mail'] = "El correo ingresado es invalido.";
 
        console.log(JSON.stringify(errores));
    }
}