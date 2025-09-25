import { validarCampo, emailRegex, passwordRegex, estadoValidacionCampos, enviarFormulario } from "./register.js";

const estadoValidacionCamposLogin = {
    userEmail: false,
    userPassword: false,
};

const formLogin = document.querySelector(".form-login");
//const inputUser = document.querySelector(".form-login input[name='userName']")
const inputEmail = document.querySelector(".form-login input[type='email']")
const inputPass = document.querySelector(".form-login input[type='password']")
const alertaErrorLogin = document.querySelector(".form-login .alerta-error");
const alertaExitoLogin = document.querySelector(".form-login .alerta-exito");

document.addEventListener("DOMContentLoaded", () => {
    formLogin.addEventListener("submit", e => {
        estadoValidacionCampos.userName = true;

        e.preventDefault();
        enviarFormulario(formLogin, alertaErrorLogin, alertaExitoLogin, estadoValidacionCamposLogin);
    });

    inputEmail.addEventListener("input", () => {
        validarCampo(emailRegex, inputEmail, "El correo puede contener letras, numeros, puntos y guion bajo.", estadoValidacionCamposLogin);
    });

    inputPass.addEventListener("input", () => {
        validarCampo(passwordRegex, inputPass, "La contreseña tiene que ser de 4 a 12 digitos.", estadoValidacionCamposLogin);
    });
});