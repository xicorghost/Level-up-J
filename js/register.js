const formRegister = document.querySelector(".form-register");
const inputUser = document.querySelector(".form-register input[name='userName']");
const inputRut = document.querySelector(".form-register input[name='userRut']");
const inputEmail = document.querySelector(".form-register input[name='userEmail']");
const inputDate = document.querySelector(".form-register input[name='userDate']");
const inputPass = document.querySelector(".form-register input[name='userPassword']");
const alertaError = document.querySelector(".form-register .alerta-error");
const alertaExito = document.querySelector(".form-register .alerta-exito");

// Regex
const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
const rutRegex = /^\d{7,8}-[0-9kK]$/;
export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const passwordRegex = /^.{4,12}$/;

// Estado solo para registro
const estadoValidacionCamposRegister = {
    userName: false,
    userRut: false,
    userEmail: false,
    userDate: false,
    userPassword: false,
};

document.addEventListener("DOMContentLoaded", () => {
    formRegister.addEventListener("submit", e => {
        e.preventDefault();
        enviarFormulario(formRegister, alertaError, alertaExito, estadoValidacionCamposRegister);
    });

    inputUser.addEventListener("input", () => {
        validarCampo(userNameRegex, inputUser, "El usuario debe tener de 4 a 16 caracteres, letras o guiones.", estadoValidacionCamposRegister);
    });

    inputRut.addEventListener("input", () => {
        validarCampo(rutRegex, inputRut, "El RUT debe ser válido (ej: 12345678-9).", estadoValidacionCamposRegister);
    });

    inputEmail.addEventListener("input", () => {
        validarCampo(emailRegex, inputEmail, "El correo puede contener letras, números, puntos y guion bajo.", estadoValidacionCamposRegister);
    });

    inputPass.addEventListener("input", () => {
        validarCampo(passwordRegex, inputPass, "La contraseña debe tener de 4 a 12 caracteres.", estadoValidacionCamposRegister);
    });

    inputDate.addEventListener("input", () => {
        validarFechaNacimiento(inputDate, estadoValidacionCamposRegister);
    });
});

// Validar campo genérico con regex
export function validarCampo(regularExpresion, campo, mensaje, estado) {
    const esValido = regularExpresion.test(campo.value);
    if (esValido) {
        eliminarAlerta(campo.parentElement.parentElement);
        estado[campo.name] = true;
        campo.parentElement.classList.remove("error");
        return;
    }
    mostrarAlerta(campo.parentElement.parentElement, mensaje);
    campo.parentElement.classList.add("error");
    estado[campo.name] = false;
}

// Validar fecha de nacimiento (≥ 18 años)
function validarFechaNacimiento(campo, estado) {
    const fechaNac = new Date(campo.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    let esMayor = edad > 18 || (edad === 18 && mes >= 0 && hoy.getDate() >= fechaNac.getDate());

    if (esMayor) {
        eliminarAlerta(campo.parentElement.parentElement);
        estado[campo.name] = true;
        campo.parentElement.classList.remove("error");
    } else {
        mostrarAlerta(campo.parentElement.parentElement, "Debes ser mayor de 18 años.");
        campo.parentElement.classList.add("error");
        estado[campo.name] = false;
    }
}

function mostrarAlerta(referencia, mensaje) {
    eliminarAlerta(referencia);
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta", "error");
    alertaDiv.textContent = mensaje;
    referencia.appendChild(alertaDiv);
}

function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");
    if (alerta) {
        alerta.remove();
    }
}

// Enviar formulario (recibe estado según el formulario)
export function enviarFormulario(form, alertaError, alertaExito, estado) {
    const camposValidos = Object.values(estado).every(value => value === true);

    if (camposValidos) {
        /* 
        alertaExito.classList.add("alerta-exito");
        alertaError.classList.remove("alerta-error");
        form.reset(); */
        alertaError.classList.remove("activa");
        alertaExito.classList.add("activa");
        alertaExito.textContent = "Registro exitoso 🎉";
        form.reset();
        setTimeout(() => {
            alertaExito.classList.remove("activa");
        }, 3000);

        console.log("Formulario enviado");
        return;
    }else{
        alertaExito.classList.remove("activa");
        alertaError.classList.add("activa");
        alertaError.textContent = "Todos los campos son obligatorios o tienen errores.";
    }

    /* 
    alertaExito.classList.remove("alerta-exito");
    alertaError.classList.add("alerta-error");*/

    setTimeout(() => {
        alertaError.classList.remove("activa");
    }, 3000);
}
