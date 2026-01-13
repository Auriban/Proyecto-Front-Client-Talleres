# Frontend de Talleres (React + Vite)

## Descripción

Este repositorio contiene el frontend (cliente) de la aplicación de talleres.
Está desarrollado con **React + Vite** y consume una API REST (backend) para:

* Listar talleres
* Ver detalles
* Inscribirse
* Gestionar usuarios
* Subir y mostrar imágenes
* Navegar mediante rutas protegidas

La aplicación utiliza **react-router** y componentes funcionales de React.

---

## Tecnologías y dependencias

* **React + Vite**
* **react-router-dom** — enrutado
* **leaflet / react-leaflet** — mapas
* **react-burger-menu** — menú hamburguesa
* **sweetalert2** — alertas y confirmaciones
* **CSS** — estilos
* **Yarn** — gestor de dependencias

---

## Dependencias principales (`package.json`)

* leaflet
* react
* react-dom
* react-router-dom
* react-leaflet
* react-burger-menu
* sweetalert2

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto.
Vite **solo expone variables que comiencen con `VITE_`**.

Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME="Talleres"
```

---

## Estructura del proyecto

```
├── src/        # Código fuente React (componentes, páginas, rutas, hooks)
├── public/     # Archivos estáticos
├── .env        # Variables de entorno (no commitear)
├── package.json
└── vite.config.js
```

---

## Scripts disponibles (Yarn)

* `yarn dev` — inicia el servidor de desarrollo (Vite + HMR)
* `yarn build` — genera la build de producción (`dist/`)
* `yarn preview` — sirve la build localmente
* `yarn lint` — ejecuta ESLint (si está configurado)

---

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Auriban/Proyecto-Front-Client-Talleres.git
   cd Proyecto-Front-Client-Talleres
   ```

2. Instalar dependencias:

   ```bash
   yarn install
   ```

3. Crear el archivo `.env`:

   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. Ejecutar en modo desarrollo:

   ```bash
   yarn dev
   ```


5. Build de producción:

   ```bash
   yarn build
   yarn preview
   ```

---

## Conexión con el backend

* El frontend consume una **API REST**.
* Verificá que `VITE_API_URL` apunte correctamente al backend.
* Si hay problemas de CORS, configura el backend o un proxy en `vite.config.js`.

---

## Rutas / Páginas (ejemplo)

* `/` — Home / listado de talleres
* `/taller/:id` — Detalle del taller
* `/login` — Iniciar sesión
* `/signup` — Registro
* `/perfil` — Perfil del usuario
* Rutas administrativas protegidas (solo rol admin)

---

## Subida de imágenes

* Las imágenes se envían al backend mediante `FormData`.
* El backend devuelve la URL que luego se renderiza en el frontend.
---

