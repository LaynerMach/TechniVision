const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");

// 1. INICIO DE SESIÓN
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;

    // CLAVE SECRETA DE PRUEBA -> Redirige al Dashboard
    if (usuarioInput === "admin" && password === "12345") {
        localStorage.setItem("token", "token_temporal_admin_123");
        localStorage.setItem("usuario", JSON.stringify({ nombre: "Administrador" }));

        mensaje.style.color = "green";
        mensaje.textContent = "Acceso de prueba correcto. Redirigiendo...";

        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 1000);
        return;
    }

    // LOGIN NORMAL CONTRA LA BASE DE DATOS
    try {
        const respuesta = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: usuarioInput, password: password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            localStorage.setItem('token', datos.token);
            localStorage.setItem('usuario', JSON.stringify(datos.usuario || { nombre: usuarioInput }));

            mensaje.style.color = "green";
            mensaje.textContent = "¡Inicio de sesión exitoso!";

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = datos.mensaje || "Usuario o contraseña incorrectos";
        }
    } catch (error) {
        console.error("Error en el login:", error);
        mensaje.style.color = "red";
        mensaje.textContent = "Error al conectar con el servidor";
    }
});

// 2. REGISTRO DE NUEVOS USUARIOS
if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = document.getElementById("regNombre").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;

        try {
            const respuesta = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                mensaje.style.color = "green";
                mensaje.textContent = "¡Registro exitoso! Ya puedes iniciar sesión.";
                registerForm.reset();
                setTimeout(() => toggleForm('login'), 1500);
            } else {
                mensaje.style.color = "red";
                mensaje.textContent = datos.mensaje || "Error al registrar el usuario";
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            mensaje.style.color = "red";
            mensaje.textContent = "Error al conectar con el servidor para el registro";
        }
    });
}