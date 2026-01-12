const BASE_URL = import.meta.env.VITE_URL;

export const obtenerTalleres = async () => {

  const respuesta = await fetch(`${BASE_URL}/api/talleres`);

  const datos = await respuesta.json();

  // Devolvemos únicamente la propiedad data
  return datos.data;
};

export const crearTaller = async (nuevoTaller) => {
  const token = localStorage.getItem('token');

  const datosForm = new FormData();

  datosForm.append('titulo', nuevoTaller.titulo);
  datosForm.append('descripcion', nuevoTaller.descripcion);
  datosForm.append('precio', nuevoTaller.precio);
  datosForm.append('fecha', nuevoTaller.fecha);
  datosForm.append('categoria', nuevoTaller.categoria);

  if (nuevoTaller.direccion !== undefined) {
    datosForm.append('direccion', nuevoTaller.direccion);
  }
  if (nuevoTaller.lat !== undefined && nuevoTaller.lat !== '') {
    datosForm.append('lat', nuevoTaller.lat);
  }
  if (nuevoTaller.lng !== undefined && nuevoTaller.lng !== '') {
    datosForm.append('lng', nuevoTaller.lng);
  }

  if (nuevoTaller.imgTaller && nuevoTaller.imgTaller.name) {
    datosForm.append('imgTaller', nuevoTaller.imgTaller);
  }

  const respuesta = await fetch(`${BASE_URL}/api/talleres/creartaller`, {
    method: 'POST',
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

export const actualizarTaller = async (id, tallerData) => {
  const token = localStorage.getItem('token');
  const datosForm = new FormData();

  datosForm.append('titulo', tallerData.titulo);
  datosForm.append('descripcion', tallerData.descripcion);
  datosForm.append('precio', tallerData.precio);
  datosForm.append('fecha', tallerData.fecha);
  datosForm.append('categoria', tallerData.categoria);

  if (tallerData.direccion !== undefined) {
    datosForm.append('direccion', tallerData.direccion);
  }
  if (tallerData.lat !== undefined && tallerData.lat !== '') {
    datosForm.append('lat', tallerData.lat);
  }
  if (tallerData.lng !== undefined && tallerData.lng !== '') {
    datosForm.append('lng', tallerData.lng);
  }
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

export const crearUsuario = async (usuarioData) => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(usuarioData)
  });

  if (!respuesta.ok) {
    const text = await respuesta.text();
    throw new Error(text || `Error ${respuesta.status} creando usuario`);
  }

  return await respuesta.json();
};

export const actualizarUsuario = async (id, usuarioData) => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(usuarioData)
  });

  if (!respuesta.ok) {
    const text = await respuesta.text();
    throw new Error(text || `Error ${respuesta.status} actualizando usuario`);
  }

  return await respuesta.json();
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

};

export const inscribirseTaller = async (tallerId) => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/inscripciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ tallerId })
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
  }

  return await respuesta.json();
};

export const obtenerMisInscripciones = async () => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/inscripciones`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener inscripciones`);
  }

  const datos = await respuesta.json();
  return datos.data;
};

export const cancelarInscripcion = async (inscripcionId) => {
  const token = localStorage.getItem('token');

  const respuesta = await fetch(`${BASE_URL}/api/inscripciones/${inscripcionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al cancelar inscripción`);
  }

  return await respuesta.json();
};

export const loginAuth = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) throw new Error((await res.json()).error || 'Error login');
  return await res.json();
};

export const registerAuth = async (email, password, name) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  
  if (!res.ok) throw new Error((await res.json()).error || 'Error register');
  return await res.json();
};

export const verificarPerfil = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null; //no hay token pero no pasa nada
  }
  
  const res = await fetch(`${BASE_URL}/api/auth/perfil`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!res.ok) throw new Error('Token inválido');
  return await res.json();
};

