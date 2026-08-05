const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    if(usuario === "admin" && password === "12345"){

        localStorage.setItem("usuario","Administrador");

        mensaje.style.color = "green";
        mensaje.textContent = "Inicio de sesión correcto";

        setTimeout(function(){

            window.location.href = "dashboard.html";

        },1000);

    }else{

        mensaje.style.color = "red";
        mensaje.textContent = "Usuario o contraseña incorrectos";

    }

});

});