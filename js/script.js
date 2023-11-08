function borrarDatos(){
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const correo = document.querySelector("#correo");
    const cantidad = document.querySelector("#cantidad");
    const totalElement = document.querySelector("#total");


    nombre.value = "";
    apellido.value = "";
    correo.value = "";
    cantidad.value = "";
    totalElement.textContent = "";
}

function es_correo_valido(correo) {
    const correo_valido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return correo_valido.test(correo);
}

function cargar_categoria(){
    let categoria_estudiante = document.querySelector(".categoria_estudiante");
    let categoria_trainee = document.querySelector(".categoria_trainee");
    let categoria_junior = document.querySelector(".categoria_junior");
    
    let categoria_seleccionada = document.querySelector("#categoria"); 
    
    
    categoria_estudiante.addEventListener("click", function() {
        categoria_seleccionada.value = "Estudiante";
    });
    
    categoria_trainee.addEventListener("click", function() {
        categoria_seleccionada.value = "Trainee";
    });

    categoria_junior.addEventListener("click", function() {
        categoria_seleccionada.value = "Junior";
    });
    
}

function mostrarMensajeError(mensaje, contenedorSeleccionado){
    const contenedor = document.querySelector(contenedorSeleccionado);
    const estado = document.createElement("p");
    estado.classList.add("info_estado");
    estado.textContent = mensaje;
    contenedor.appendChild(estado);
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
    } else if (!es_correo_valido(correo)) {
        mostrarMensajeError("Escriba un correo válido.", ".inputContenedorCorreo");
        return;
    } else if (cantidad === "" || isNaN(cantidad)) {
        mostrarMensajeError("Escriba un numero válido.", ".inputContenedorCantidad");    
        return;
    } 
    return true;
}

function calcularTotal(cantidad, valor_entrada) {
    let categoria_seleccionada = document.querySelector("#categoria").value;
    let descuento_estudiante = 0.8;
    let descuento_trainee =  0.5;
    let descuento_junior = 0.15;

    cantidad = parseInt(cantidad);
    let descuento = 0;
    if (categoria_seleccionada === "Estudiante") {
        descuento = parseInt(cantidad * valor_entrada - descuento_estudiante * cantidad * valor_entrada);
    } else if (categoria_seleccionada === "Trainee") {
        descuento = parseInt(cantidad * valor_entrada - descuento_trainee * cantidad * valor_entrada);
    } else if (categoria_seleccionada === "Junior") {
        descuento = parseInt(cantidad * valor_entrada - descuento_junior * cantidad * valor_entrada);
    } else {
        console.log('No se ha elegido una opción');
    }

    return descuento;
}

function calcularResumen(){
    if(verificar_campo_completo()){
        const valor_entrada = 200;
        verificar_campo_completo();

        const totalDescuentos = calcularTotal(document.querySelector("#cantidad").value, valor_entrada);
        const totalElement = document.querySelector("#total");

        if(totalDescuentos){
            totalElement.textContent = totalDescuentos;
        }
    } else {
        alert("Complete todos los campos correctamente");
    }
    
}

cargar_categoria();

const boton_resumen = document.querySelector("#btn_resumen");
boton_resumen.addEventListener("click", calcularResumen);

const boton_borrar = document.querySelector("#btn_borrar");
boton_borrar.addEventListener("click", borrarDatos);
