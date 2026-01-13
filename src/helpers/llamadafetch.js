/**
 * Servicio HTTP para el front adaptado a cookies httpOnly.
 * - Usa cookies enviadas automáticamente por el navegador (credentials: 'include').
 */
const BASE_URL = import.meta.env.VITE_URL;

/**
 * Devuelve la lista de talleres.
 */
export const obtenerTalleres = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/talleres`);
  const datos = await respuesta.json();
  return datos.data;
};

/**
 * Crea un taller (multipart/form-data).
 * Esa cookies (credentials: 'include') en vez de Authorization header.
 */
export const crearTaller = async (nuevoTaller) => {
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
    body: datosForm,
    credentials: 'include' // <- ENVÍA la cookie httpOnly
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
  }

  return await respuesta.json();
};

/**
 * Actualiza un taller por id.
 */
export const actualizarTaller = async (id, tallerData) => {
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
    body: datosForm,
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
  }

  return await respuesta.json();
};

/**
 * Elimina un taller por id.
 */
export const eliminarTaller = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/api/talleres/eliminartaller/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al eliminar el taller`);
  }
};

/**
 * Obtiene un taller por su id.
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
 * Devuelve la lista de usuarios (requiere autenticación).
 */
export const obtenerUsuarios = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/usuarios`, {
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener usuarios`);
  }

  const datos = await respuesta.json();
  return datos.data;
};

/**
 * Crea un usuario (solo admin).
 */
export const crearUsuario = async (usuarioData) => {
  const respuesta = await fetch(`${BASE_URL}/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioData),
    credentials: 'include'
  });

  if (!respuesta.ok) {
    const text = await respuesta.text();
    throw new Error(text || `Error ${respuesta.status} creando usuario`);
  }

  return await respuesta.json();
};

/**
 * Actualiza un usuario por id.
 */
export const actualizarUsuario = async (id, usuarioData) => {
  const respuesta = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioData),
    credentials: 'include'
  });

  if (!respuesta.ok) {
    const text = await respuesta.text();
    throw new Error(text || `Error ${respuesta.status} actualizando usuario`);
  }

  return await respuesta.json();
};

/**
 * Elimina un usuario por id.
 */
export const eliminarUsuario = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al eliminar usuario`);
  }
};

/**
 * Inscribe al usuario en un taller.
 */
export const inscribirseTaller = async (tallerId) => {
  const respuesta = await fetch(`${BASE_URL}/api/inscripciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tallerId }),
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: ${await respuesta.text()}`);
  }

  return await respuesta.json();
};

/**
 * Devuelve las inscripciones del usuario logueado.
 */
export const obtenerMisInscripciones = async () => {
  const respuesta = await fetch(`${BASE_URL}/api/inscripciones`, {
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener inscripciones`);
  }

  const datos = await respuesta.json();
  return datos.data;
};

/**
 * Cancela una inscripción por id.
 */
export const cancelarInscripcion = async (inscripcionId) => {
  const respuesta = await fetch(`${BASE_URL}/api/inscripciones/${inscripcionId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al cancelar inscripción`);
  }

  return await respuesta.json();
};

/**
 * Login: ahora envía credentials para que el servidor ponga la cookie httpOnly.
 * El servidor devuelve datos del usuario en el body; no hay token en el body.
 */
export const loginAuth = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (!res.ok) throw new Error((await res.json()).error || 'Error login');
  return await res.json();
};

/**
 * Registro de usuario: idem login (cookie será enviada en Set-Cookie).
 */
export const registerAuth = async (email, password, name) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
    credentials: 'include'
  });

  if (!res.ok) throw new Error((await res.json()).error || 'Error register');
  return await res.json();
};

/**
 * Verifica el perfil usando la cookie enviada automáticamente.
 * Devuelve null si no hay sesión.
 */
export const verificarPerfil = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/perfil`, {
    credentials: 'include'
  });

  if (res.status === 401) return null; // no autenticado
  if (!res.ok) throw new Error('Error verificando perfil');
  return await res.json();
};