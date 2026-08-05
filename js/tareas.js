let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const formulario = document.getElementById("tareaForm");
const tabla = document.querySelector("#tablaTareas tbody");

let indiceEditar = -1;

mostrarTareas();

formulario.addEventListener("submit",function(e){

e.preventDefault();

const nombre=document.getElementById("nombreTarea").value.trim();
const prioridad=document.getElementById("prioridad").value;
const estado=document.getElementById("estado").value;

if(nombre===""){

alert("Ingrese una tarea.");

return;

}

if(indiceEditar==-1){

tareas.push({

nombre,
prioridad,
estado

});

}else{

tareas[indiceEditar]={

nombre,
prioridad,
estado

};

indiceEditar=-1;

}

guardar();

formulario.reset();

mostrarTareas();

});

function mostrarTareas(){

tabla.innerHTML="";

tareas.forEach((tarea,index)=>{

tabla.innerHTML+=`

<tr>

<td>${tarea.nombre}</td>

<td>${tarea.prioridad}</td>

<td>${tarea.estado}</td>

<td>

<button class="editar"
onclick="editar(${index})">

Editar

</button>

<button class="eliminar"
onclick="eliminar(${index})">

Eliminar

</button>

</td>

</tr>

`;

});

document.getElementById("contadorTareas").textContent=

"Total tareas: "+tareas.length;

}

function guardar(){

localStorage.setItem("tareas",JSON.stringify(tareas));

}

function eliminar(index){

if(confirm("¿Eliminar tarea?")){

tareas.splice(index,1);

guardar();

mostrarTareas();

}

}

function editar(index){

document.getElementById("nombreTarea").value=tareas[index].nombre;

document.getElementById("prioridad").value=tareas[index].prioridad;

document.getElementById("estado").value=tareas[index].estado;

indiceEditar=index;

}

function limpiarFormulario(){

formulario.reset();

indiceEditar=-1;

}