# Sistema de Mensajería para Instituto Virtual

Este proyecto contiene un prototipo funcional de una aplicación de mensajería en tiempo real diseñada específicamente para institutos de educación virtual. Permite la comunicación entre alumnos, docentes y colaboradores, organizada por aulas virtuales.

## 🚀 Características Principales

1.  **Gestión de Roles:** Diferenciación clara entre Alumnos, Docentes, Colaboradores y Administradores.
2.  **Aulas Virtuales:** Creación de grupos específicos para cada clase (ej: "Matemáticas", "Historia").
3.  **Chat en Tiempo Real:**
    *   **Grupal:** Dentro de cada aula para discusiones de clase.
    *   **Privado:** Mensajería directa entre usuarios (ej: alumno consultando al docente).
4.  **Campañas Comunicativas:** Los administradores pueden enviar notificaciones masivas (pop-ups) a todos los conectados.
5.  **Multi-plataforma:** Funciona en navegadores Web y es adaptable para móviles (Responsive).

## 🛠️ Tecnologías Utilizadas

*   **Backend:** Node.js, Express, Socket.io (para comunicación en tiempo real).
*   **Frontend:** React (vía CDN para prototipado rápido), Tailwind CSS (estilos), HTML5.
*   **Base de Datos:** Simulada en memoria (Mapas de JS) para este demo. En producción se recomienda MongoDB o PostgreSQL.

## 📋 Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### 1. Preparar el Entorno

Asegúrate de tener instalado **Node.js** (versión 14 o superior).

Abre tu terminal en la carpeta donde guardaste estos archivos (`/workspace`) e inicializa el proyecto:

```bash
npm init -y
npm install express socket.io cors
```

### 2. Iniciar el Servidor (Backend)

En una terminal, ejecuta el servidor de Node.js:

```bash
node instituto-chat-server.js
```

*Deberías ver el mensaje: `SERVIDOR DE CHAT DEL INSTITUTO CORRIENDO EN PUERTO 3001`*

### 3. Iniciar el Cliente (Frontend)

Tienes dos opciones para ver la interfaz:

**Opción A (Servidor Simple):**
Si tienes Python instalado, puedes levantar un servidor estático rápidamente en otra terminal:
```bash
# Para Python 3
python3 -m http.server 8080
```
Luego abre tu navegador en `http://localhost:8080/instituto-chat-client.html`.

**Opción B (Directo):**
Simplemente abre el archivo `instituto-chat-client.html` haciendo doble clic en tu explorador de archivos. *Nota: Algunos navegadores pueden bloquear conexiones WebSocket si se abre directamente como archivo local (file://), por lo que la Opción A es más recomendada.*

## 🧪 Cómo Probar las Funcionalidades

1.  **Simular Usuarios:** Abre el archivo `instituto-chat-client.html` en **dos pestañas diferentes** o en **dos navegadores distintos** (ej: Chrome y Firefox).
2.  **Login:**
    *   En la pestaña 1, ingresa como **Admin** (Nombre: "Director", ID: "admin1", Rol: Administrador).
    *   En la pestaña 2, ingresa como **Alumno** (Nombre: "Juan", ID: "u1", Rol: Alumno).
3.  **Chatear en Aula:**
    *   Ambos usuarios deben hacer clic en "Matemáticas Avanzadas" en la barra lateral.
    *   Envíen mensajes y verán cómo aparecen instantáneamente en ambas pantallas.
4.  **Enviar Campaña:**
    *   Como **Admin**, haz clic en "Enviar Campaña" (simulado en el sidebar).
    *   Verás que al **Alumno** le salta una alerta amarilla con la notificación masiva.

## 🔮 Siguientes Pasos (Para Producción)

Para convertir este prototipo en una aplicación real para tu instituto:

1.  **Base de Datos Real:** Conectar el backend a MongoDB para guardar usuarios, historial de chats y estructura de aulas permanentemente.
2.  **Autenticación:** Implementar Login con correo/contraseña y JWT (JSON Web Tokens) para seguridad.
3.  **App Móvil:** Usar **React Native**. La lógica de este frontend es 90% compatible; solo habría que cambiar las etiquetas HTML (`div`, `input`) por componentes nativos (`View`, `TextInput`).
4.  **Archivos:** Habilitar el envío de imágenes y PDFs usando `multer` en el backend.