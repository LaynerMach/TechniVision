let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

document.getElementById("total").textContent = empleados.length;

let administradores = 0;
let supervisores = 0;
let otros = 0;

empleados.forEach(emp=>{

    let cargo = emp.cargo.toLowerCase();

    if(cargo.includes("admin")){

        administradores++;

    }else if(cargo.includes("super")){

        supervisores++;

    }else{

        otros++;

    }

});

document.getElementById("administradores").textContent = administradores;

document.getElementById("supervisores").textContent = supervisores;

document.getElementById("otros").textContent = otros;