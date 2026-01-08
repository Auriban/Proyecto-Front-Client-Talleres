const BASE_URL = import.meta.env.VITE_URL;

export const obtenerTalleres = async () => {

  const respuesta = await fetch(`${BASE_URL}/api/talleres`);

  const datos = await respuesta.json();

  // Devolvemos únicamente la propiedad data
  return datos.data;
};


export const crearTaller = async (nuevoTaller) => {
  // Obtenemos el token JWT almacenado tras el login
  const token = localStorage.getItem('token');

  // FormData permite enviar texto + archivos 
  const datosForm = new FormData();

  // Añadimos los campos del formulario
  datosForm.append('titulo', nuevoTaller.titulo);
  datosForm.append('descripcion', nuevoTaller.descripcion);
  datosForm.append('precio', nuevoTaller.precio);
  datosForm.append('fecha', nuevoTaller.fecha);
  datosForm.append('categoria', nuevoTaller.categoria);

  // Solo añadimos la imagen si existe y es un archivo válido
  if (nuevoTaller.imgTaller && nuevoTaller.imgTaller.name) {
    datosForm.append('imgTaller', nuevoTaller.imgTaller);
  }

  const respuesta = await fetch(`${BASE_URL}/api/talleres/creartaller`, {
    method: 'POST',
    headers: {
      // Enviamos el token en el header Authorization 
      'Authorization': `Bearer ${token}`
      // No se define Content-Type porque fetch lo gestiona automáticamente con FormData
    },
    body: datosForm
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
  }

  return await respuesta.json();
};



export const actualizarTaller = async (id, tallerData) => {
  const token = localStorage.getItem('token');
  const datosForm = new FormData();

  // Añadimos los datos actualizados
  datosForm.append('titulo', tallerData.titulo);
  datosForm.append('descripcion', tallerData.descripcion);
  datosForm.append('precio', tallerData.precio);
  datosForm.append('fecha', tallerData.fecha);
  datosForm.append('categoria', tallerData.categoria);

  // La imagen solo se envía si el usuario selecciona una nueva
  if (tallerData.imgTaller && tallerData.imgTaller.name) {
    datosForm.append('imgTaller', tallerData.imgTaller);
  }

  const respuesta = await fetch(`${BASE_URL}/api/talleres/editartaller/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: datosForm
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
  }

  return await respuesta.json();
};

export const eliminarTaller = async (id) => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/talleres/eliminartaller/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al eliminar el taller`);
  }

 /*  
 // Algunos endpoints DELETE no devuelven JSON
  // Este try/catch evita que la app se rompa
  try {
    return await respuesta.json();
  } catch {
    return { success: true };
  } */
};

export const obtenerTallerPorId = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/api/talleres/${id}`);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener el taller`);
  }

  const datos = await respuesta.json();
  return datos.data;
};


export const obtenerUsuarios = async () => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/usuarios`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener usuarios`);
  }

  const datos = await respuesta.json();
  return datos.data;
};


export const eliminarUsuario = async (id) => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al eliminar usuario`);
  }

/*   
try {
    return await respuesta.json();
  } catch {
    return { success: true };
  } */
};
