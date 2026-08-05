const usuario = localStorage.getItem("usuario") || "Administrador";

document.getElementById("bienvenida").textContent =
"Bienvenido, " + usuario;

let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

document.getElementById("totalEmpleados").textContent =
"Total de empleados registrados: " + empleados.length;

function cerrarSesion(){

    if(confirm("¿Desea cerrar sesión?")){

        localStorage.removeItem("usuario");

        window.location.href="index.html";

    }

}