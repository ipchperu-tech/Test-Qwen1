# Instituto Virtual - Portal de Comunicación

Aplicación de mensajería en tiempo real para institutos educativos con clases 100% en vivo.

## 🚀 Despliegue en Producción (Solo subiendo a GitHub)

Esta aplicación está configurada para desplegarse automáticamente en **Render**, **Railway** o **Heroku** simplemente conectando tu repositorio de GitHub.

### Pasos para publicar:

#### Opción A: Usando Render (Recomendado - Gratis)

1. Sube este código a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Ve a [render.com](https://render.com) y crea una cuenta gratuita.

3. Haz clic en **"New +"** → **"Web Service"**.

4. Conecta tu repositorio de GitHub.

5. Configura el servicio:
   - **Name**: `instituto-chat` (o el nombre que quieras)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

6. Haz clic en **"Create Web Service"**.

7. ¡Listo! Render te dará una URL como `https://instituto-chat.onrender.com` donde tu app estará disponible 24/7.

#### Opción B: Usando Railway

1. Sube tu código a GitHub.

2. Ve a [railway.app](https://railway.app) e inicia sesión con GitHub.

3. Haz clic en **"New Project"** → **"Deploy from GitHub repo"**.

4. Selecciona tu repositorio.

5. Railway detectará automáticamente que es Node.js y desplegará.

#### Opción C: Usando Heroku

1. Instala la CLI de Heroku en tu computadora.

2. Ejecuta estos comandos:
   ```bash
   heroku login
   heroku create instituto-chat-app
   git push heroku main
   ```

---

## 📱 Cómo usar la aplicación

### Para el Administrador del Instituto:

1. Accede a la URL de tu aplicación desplegada.
2. Inicia sesión como **Administrador**.
3. Desde el panel podrás:
   - Ver todos los aulas creadas.
   - Enviar **campañas comunicativas** masivas a todos los usuarios.
   - Monitorear la actividad.

### Para Docentes y Alumnos:

1. Accede a la URL proporcionada por el instituto.
2. Ingresa tu **Nombre**, **ID de usuario** y selecciona tu **Rol**.
3. Selecciona un aula de la lista lateral.
4. Comienza a chatear en tiempo real con los miembros del aula.

---

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: React (CDN), TailwindCSS
- **Comunicación**: WebSockets para tiempo real

## 📂 Estructura del Proyecto

```
/workspace
├── server.js              # Servidor backend (API + WebSockets)
├── package.json           # Dependencias y scripts
├── public/
│   └── index.html         # Frontend completo (React embebido)
└── README.md              # Este archivo
```

## 🔌 Endpoints API

- `POST /api/classrooms/create` - Crear nueva aula
- `POST /api/classrooms/enroll` - Inscribir alumno en aula
- `POST /api/admin/broadcast` - Enviar notificación masiva

## 🎯 Funcionalidades

✅ Chat grupal por aulas virtuales
✅ Mensajería privada entre usuarios
✅ Notificaciones push en tiempo real
✅ Campañas comunicativas masivas
✅ Roles diferenciados (Admin, Docente, Alumno)
✅ Interfaz responsive (Web y Móvil)
✅ Historial de mensajes (en memoria para demo)

---

**Nota**: Esta versión usa almacenamiento en memoria. Para producción con datos persistentes, conecta una base de datos MongoDB o PostgreSQL.
