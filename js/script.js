import { datos } from '../data/data.js';

// Importo variables del programa datos:

const valorEstudiante = datos.estudiante;
const valorTrainee = datos.trainee;
const valorJunior = datos.junior;
const valor = datos.valor;


let categoria_estudiante = document.querySelector(".categoria_estudiante");
let categoria_trainee = document.querySelector(".categoria_trainee");
let categoria_junior = document.querySelector(".categoria_junior");
let categoria = document.querySelector("#categoria");
let seleccion = "";

categoria_estudiante.addEventListener("click", function() {
    categoria.value = "Estudiante";
    seleccion = "Estudiante";
});

categoria_trainee.addEventListener("click", function() {
    categoria.value = "Trainee";
    seleccion = "Trainee";
});

categoria_junior.addEventListener("click", function() {
    categoria.value = "Junior";
    seleccion = "Junior";
});

function calcularTotal(cantidad) {
    cantidad = parseInt(cantidad);
    let descuento = 0;
    if (seleccion === "Estudiante") {
        descuento = parseInt(cantidad * valor - valorEstudiante * cantidad * valor);
    } else if (seleccion === "Trainee") {
        descuento = parseInt(cantidad * valor - valorTrainee * cantidad * valor);
    } else if (seleccion === "Junior") {
        descuento = parseInt(cantidad * valor - valorJunior * cantidad * valor);
    } else {
        console.log('No se ha elegido una opción');
    }

    return descuento;
}


function verificar_campo_completo() {
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const correo = document.querySelector("#correo").value;
    const cantidad = document.querySelector("#cantidad").value;
    const estado = document.querySelector(".info_estado");
    if (estado) {
        estado.remove();
    }

    if (nombre === "") {
        mostrarMensajeError("Escriba un nombre válido.", ".inputContenedorNombre");
        return;
    } else if (apellido === "") {
        mostrarMensajeError("Escriba un apellido válido.", ".inputContenedorApellido");
        return;
    } else if (correo === "") {
        mostrarMensajeError("Escriba un correo válido.", ".inputContenedorCorreo");
        return;
    } else if (cantidad === "" || isNaN(cantidad)) {
        mostrarMensajeError("Escriba un numero válido.", ".inputContenedorCantidad");    
        return;
    } 
}

function calcularResumen(){
    verificar_campo_completo();
    const totalDescuentos = calcularTotal(document.querySelector("#cantidad").value);
    const resumenPrecioFinal = precioBase + totalDescuentos;

    const totalElement = document.getElementById("total");

    if(totalElement) {
        totalElement.textContent;
    }
}

function mostrarMensajeError(mensaje, contenedorSeleccionado){
    const contenedor = document.querySelector(contenedorSeleccionado);
    const estado = document.createElement("p");
    estado.classList.add("info_estado");
    estado.textContent = mensaje;
    contenedor.appendChild(estado);
}



function borrarDatos(){
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const correo = document.querySelector("#correo");
    const cantidad = document.querySelector("#cantidad");

    nombre.value = "";
    apellido.value = "";
    correo.value = "";
    cantidad.value = "";
}
