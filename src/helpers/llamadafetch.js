const BASE_URL = import.meta.env.VITE_URL;

/**
 * Devuelve la lista de talleres.
 * @returns {Promise<any[]>} Array con los talleres (se usa data del back).
 */
export const obtenerTalleres = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/talleres`);
  const datos = await respuesta.json();
  return datos.data;
};

/**
 * Crea un taller.
 * Usa FormData para enviar texto y archivo. Añade el token desde localStorage.
 * Lanza error si la respuesta no es OK.
 *
 * @param {Object} nuevoTaller - Datos del taller.
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
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

/**
 * Actualiza un taller por id.
 * Similar a crearTaller pero usa PUT y la ruta de edición.
 *
 * @param {string} id - id del taller.
 * @param {Object} tallerData - Datos a actualizar.
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
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

/**
 * Elimina un taller por id.
 * Lanza error si no se pudo eliminar.
 *
 * @param {string} id - id del taller.
 * @returns {Promise<void>}
 */
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

/**
 * Obtiene un taller por su id.
 *
 * @param {string} id - id del taller.
 * @returns {Promise<any>} Taller (se devuelve data).
 */
export const obtenerTallerPorId = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/api/talleres/${id}`);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener el taller`);
  }

  const datos = await respuesta.json();
  return datos.data;
};

/**
 * Devuelve la lista de usuarios. Requiere token.
 *
 * @returns {Promise<any[]>} Array con los usuarios (se usa data).
 */
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

/**
 * Crea un usuario. Requiere token.
 *
 * @param {Object} usuarioData - Datos del usuario (email, password, name, role...).
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
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

/**
 * Actualiza un usuario por id. Requiere token.
 *
 * @param {string} id - id del usuario.
 * @param {Object} usuarioData - Datos a actualizar.
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
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

/**
 * Elimina un usuario por id. Requiere token.
 *
 * @param {string} id - id del usuario.
 * @returns {Promise<void>}
 */
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

/**
 * Inscribe al usuario en un taller.
 * Requiere token.
 *
 * @param {string} tallerId - id del taller.
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
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

/**
 * Devuelve las inscripciones del usuario logueado. Requiere token.
 *
 * @returns {Promise<any[]>} Array con las inscripciones (se usa data).
 */
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

/**
 * Cancela una inscripción por id. Requiere token.
 *
 * @param {string} inscripcionId - id de la inscripción.
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
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

/**
 * Login: devuelve token y datos del usuario si todo va bien.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
export const loginAuth = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) throw new Error((await res.json()).error || 'Error login');
  return await res.json();
};

/**
 * Registro de usuario.
 *
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @returns {Promise<any>} Respuesta del servidor (JSON).
 */
export const registerAuth = async (email, password, name) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  
  if (!res.ok) throw new Error((await res.json()).error || 'Error register');
  return await res.json();
};

/**
 * Verifica el perfil usando el token en localStorage.
 * Si no hay token devuelve null (no pasa nada).
 *
 * @returns {Promise<any|null>} Perfil del usuario o null si no hay token.
 */
export const verificarPerfil = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null;
  }
  
  const res = await fetch(`${BASE_URL}/api/auth/perfil`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!res.ok) throw new Error('Token inválido');
  return await res.json();
};