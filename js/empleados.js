let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

const formulario = document.getElementById("empleadoForm");
const tabla = document.querySelector("#tablaEmpleados tbody");
const mensaje = document.getElementById("mensajeExito");
const contador = document.getElementById("contadorEmpleados");
const buscador = document.getElementById("buscarEmpleado");

let indiceEditar = -1;

mostrarEmpleados();

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let cargo = document.getElementById("cargo").value.trim();

    if(nombre==="" || cargo===""){

        alert("Complete todos los campos.");
        return;

    }

    if(indiceEditar==-1){

        let existe = empleados.some(emp =>
            emp.nombre.toLowerCase()===nombre.toLowerCase()
        );

        if(existe){

            alert("Ese empleado ya existe.");
            return;

        }

        empleados.push({nombre,cargo});

        mostrarMensaje("Empleado registrado correctamente.");

    }else{

        empleados[indiceEditar]={nombre,cargo};

        indiceEditar=-1;

        document.getElementById("btnGuardar").textContent="Guardar";

        mostrarMensaje("Empleado actualizado.");

    }

    guardar();

    formulario.reset();

    mostrarEmpleados();

});

function mostrarEmpleados(lista=empleados){

    tabla.innerHTML="";

    lista.forEach((emp,index)=>{

        tabla.innerHTML+=`

        <tr>

            <td>${emp.nombre}</td>

            <td>${emp.cargo}</td>

            <td>

                <button class="editar" onclick="editar(${index})">
                    Editar
                </button>

                <button class="eliminar" onclick="eliminar(${index})">
                    Eliminar
                </button>

            </td>

        </tr>

        `;

    });

    contador.textContent="Total empleados: "+empleados.length;

}

function guardar(){

    localStorage.setItem("empleados",JSON.stringify(empleados));

}

function eliminar(index){

    if(confirm("¿Eliminar empleado?")){

        empleados.splice(index,1);

        guardar();

        mostrarEmpleados();

        mostrarMensaje("Empleado eliminado.");

    }

}

function editar(index){

    document.getElementById("nombre").value=empleados[index].nombre;

    document.getElementById("cargo").value=empleados[index].cargo;

    indiceEditar=index;

    document.getElementById("btnGuardar").textContent="Actualizar";

}

function limpiarFormulario(){

    formulario.reset();

    indiceEditar=-1;

    document.getElementById("btnGuardar").textContent="Guardar";

}

function mostrarMensaje(texto){

    mensaje.textContent=texto;

    setTimeout(()=>{

        mensaje.textContent="";

    },2000);

}

buscador.addEventListener("keyup",function(){

    let texto=this.value.toLowerCase();

    let resultado=empleados.filter(emp=>

        emp.nombre.toLowerCase().includes(texto) ||

        emp.cargo.toLowerCase().includes(texto)

    );

    mostrarEmpleados(resultado);

});