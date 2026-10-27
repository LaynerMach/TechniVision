const TOKEN = localStorage.getItem('token');

// Redirigir al login si no hay token de sesión
if (!TOKEN) {
  window.location.href = 'index.html';
}

// 1. Mostrar información del usuario autenticado (si tienes un elemento con id "nombreUsuario")
document.addEventListener('DOMContentLoaded', () => {
  const usuarioGuardado = localStorage.getItem('usuario');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const spanNombre = document.getElementById('nombreUsuario');
    if (spanNombre) spanNombre.textContent = usuario.nombre;
  }
  obtenerTareas();
});

// 2. Obtener y mostrar todas las tareas desde la API
async function obtenerTareas() {
  try {
    const respuesta = await fetch('/api/tareas', {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    // Si el token expiró o es inválido (401 / 403), redirigir al login
    if (respuesta.status === 401 || respuesta.status === 403) {
      cerrarSesion();
      return;
    }

    const tareas = await respuesta.json();
    if (Array.isArray(tareas)) {
      renderizarTareas(tareas);
    }
  } catch (error) {
    console.error('Error al obtener tareas:', error);
  }
}

// 3. Crear una nueva tarea
document.getElementById('formTarea')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const titulo = document.getElementById('tituloTarea').value.trim();
  const descripcion = document.getElementById('descripcionTarea').value.trim();

  if (!titulo) return alert('El título es obligatorio');

  try {
    const respuesta = await fetch('/api/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ titulo, descripcion })
    });

    if (respuesta.ok) {
      document.getElementById('formTarea').reset();
      obtenerTareas(); // Recargar la lista
    } else {
      const errorData = await respuesta.json();
      alert(errorData.mensaje || 'Error al crear la tarea');
    }
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
});

// 4. Eliminar una tarea por ID
async function eliminarTarea(id) {
  if (!confirm('¿Seguro que deseas eliminar esta tarea?')) return;

  try {
    const respuesta = await fetch(`/api/tareas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });

    if (respuesta.ok) {
      obtenerTareas();
    } else {
      alert('No se pudo eliminar la tarea');
    }
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
  }
}

// 5. Renderizar las tareas en el DOM
function renderizarTareas(tareas) {
  const contenedor = document.getElementById('listaTareas');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  if (tareas.length === 0) {
    contenedor.innerHTML = '<p>No tienes tareas pendientes.</p>';
    return;
  }

  tareas.forEach(tarea => {
    const item = document.createElement('div');
    item.className = 'tarea-card';
    item.innerHTML = `
      <h3>${tarea.titulo}</h3>
      <p>${tarea.descripcion || 'Sin descripción'}</p>
      <small>Estado: <strong>${tarea.estado || 'Pendiente'}</strong></small>
      <button onclick="eliminarTarea('${tarea._id}')">Eliminar</button>
    `;
    contenedor.appendChild(item);
  });
}

// 6. Función para Cerrar Sesión
function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'index.html';
}