(function () {
const formLogin = document.querySelector(".form-login");
const inputUser = document.querySelector(".form-login input[name='userName']")
//const inputRut = document.querySelector(".form-login input[name='userRut']");
const inputEmail = document.querySelector(".form-login input[type='email']")
//const inputDate = document.querySelector(".form-login input[name='userDate']");
const inputPass = document.querySelector(".form-login input[type='password']")
const alertaError = document.querySelector(".form-login .alerta-error");
const alertaExito = document.querySelector(".form-login .alerta-exito");

//const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
//^ y $ → inicio y fin de la cadena
//permite letras, números, guion bajo y guion medio.
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//
const passwordRegex = /^.{4,12}$/;
//debe tener entre 4 y 12 caracteres.

const estadoValidacionCampos = {
    //userName: false,
    userEmail: false,
    userPassword: false,
}

document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", e => {
        e.preventDefault();
        enviarFormulario()
    });

    inputEmail.addEventListener("input", () => {
        validarCampo(emailRegex, inputEmail, "El correo puede contener letras, numeros, puntos y guion bajo.")
    })

    inputPass.addEventListener("input", () => {
        validarCampo(passwordRegex, inputPass, "La contreseña tiene que ser de 4 a 12 digitos.")
    })
})

function validarCampo(regularExpresion, campo, mensaje) {
    const validarCampo = regularExpresion.test(campo.value);
    if (validarCampo) {
        eliminarAlerta(campo.parentElement.parentElement)
        estadoValidacionCampos[campo.name] = true;
        //estadoValidacionCampos[campo.]
        //console.log(estadoValidacionCampos)
        campo.parentElement.classList.remove("error");
        return;
    }
    mostrarAlerta(campo.parentElement.parentElement, mensaje)
    campo.parentElement.classList.add("error");

}

function mostrarAlerta(referencia, mensaje) {
    eliminarAlerta(referencia)
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta");
    alertaDiv.textContent = mensaje;
    referencia.appendChild(alertaDiv)
}

function eliminarAlerta(referencia) {
    const alerta = document.querySelector(".alerta");


    if (alerta) {
        alerta.remove();
    }
}
function enviarFormulario() {
    //validamos el envio del formulario
    if ( estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
        alertaExito.classList.add("alerta-Exito");
        alertaError.classList.remove("alerta-Error");
        formLogin.reset();
        setTimeout(() => {
            alertaExito.classList.remove("alerta-Exito");
        }, 3000);
        console.log("formulario enviado")
        return;
    }

    alertaExito.classList.remove("alerta-Exito");
    alertaError.classList.add("alerta-Error");
    setTimeout(() => {
        alertaError.classList.remove("alerta-Error");
    }, 3000);
} 
})();

