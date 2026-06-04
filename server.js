/**
 * SERVIDOR DE CHAT PARA INSTITUTO VIRTUAL
 * Tecnologías: Node.js, Express, Socket.io
 * 
 * Funcionalidades incluidas en este prototipo:
 * 1. Gestión de Usuarios (Alumnos, Docentes, Colaboradores).
 * 2. Creación de Aulas (Grupos).
 * 3. Chat en tiempo real (Privado y Grupal).
 * 4. Envío de Campañas/Notificaciones masivas.
 */

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permitir conexiones desde cualquier frontend (Web/Móvil)
    methods: ["GET", "POST"]
  }
});

// --- BASE DE DATOS SIMULADA EN MEMORIA ---
// En producción, esto se conectaría a MongoDB o PostgreSQL
const users = new Map(); // Almacena usuarios conectados: { socketId: { id, name, role } }
const classrooms = new Map(); // Almacena aulas: { roomId: [userIds] }
const messages = []; // Historial de mensajes

// --- MODELOS DE DATOS ---

/**
 * Estructura de Usuario:
 * { id: "u1", name: "Juan", role: "alumno" | "docente" | "colaborador" | "admin" }
 */

/**
 * Estructura de Mensaje:
 * { id, senderId, content, type: 'text' | 'image' | 'notification', timestamp, target: 'room_id' | 'user_id' }
 */

// --- ENDPOINTS API REST (Para gestión administrativa) ---

// 1. Crear un Aula Virtual
app.post('/api/classrooms/create', (req, res) => {
  const { roomId, name, teacherId } = req.body;
  if (!roomId || !name) return res.status(400).json({ error: 'Datos incompletos' });
  
  classrooms.set(roomId, { name, teacherId, members: [] });
  console.log(`Aula creada: ${name} (${roomId})`);
  res.json({ success: true, message: `Aula ${name} creada exitosamente` });
});

// 2. Inscribir alumno en un aula
app.post('/api/classrooms/enroll', (req, res) => {
  const { roomId, userId } = req.body;
  const room = classrooms.get(roomId);
  
  if (!room) return res.status(404).json({ error: 'Aula no encontrada' });
  
  if (!room.members.includes(userId)) {
    room.members.push(userId);
    // Notificar a los miembros del aula que alguien nuevo entró
    io.to(roomId).emit('user_joined', { userId, roomId });
  }
  
  res.json({ success: true, message: 'Usuario inscrito' });
});

// 3. Enviar Campaña Comunicativa (Broadcast)
app.post('/api/admin/broadcast', (req, res) => {
  const { message, targetRole, title } = req.body;
  
  // Ejemplo: Enviar notificación solo a los alumnos
  const notificationPayload = {
    type: 'campaign',
    title: title || 'Notificación del Instituto',
    content: message,
    timestamp: new Date().toISOString()
  };

  // Emitir a todos los clientes conectados (o filtrar por sala si se desea)
  io.emit('receive_notification', notificationPayload);
  
  console.log(`Campaña enviada: ${title}`);
  res.json({ success: true, message: 'Campaña enviada a todos los conectados' });
});

// --- LÓGICA DE WEBSOCKETS (TIEMPO REAL) ---

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // 1. Registro de usuario al conectarse
  socket.on('register_user', (userData) => {
    // userData: { id: "123", name: "Ana", role: "alumno" }
    users.set(socket.id, userData);
    console.log(`${userData.name} (${userData.role}) registrado.`);
    
    // Unirse automáticamente a sus aulas (simulado)
    // En prod, esto vendría de la BD consultando las aulas del usuario
  });

  // 2. Unirse a un Aula (Grupo de clase)
  socket.on('join_classroom', (roomId) => {
    socket.join(roomId);
    console.log(`Usuario ${socket.id} se unió al aula ${roomId}`);
  });

  // 3. Enviar Mensaje (Chat Grupal o Privado)
  socket.on('send_message', (data) => {
    // data: { senderId, content, targetId (roomId o userId), type }
    
    const messageData = {
      ...data,
      timestamp: new Date().toISOString(),
      senderName: users.get(socket.id)?.name || 'Desconocido'
    };

    // Guardar en historial (simulado)
    messages.push(messageData);

    if (data.targetType === 'classroom') {
      // Enviar a todo el grupo del aula
      io.to(data.targetId).emit('receive_message', messageData);
    } else if (data.targetType === 'private') {
      // Enviar mensaje privado
      // Buscar el socket del destinatario
      let targetSocketId = null;
      for (const [sid, user] of users.entries()) {
        if (user.id === data.targetId) {
          targetSocketId = sid;
          break;
        }
      }
      
      if (targetSocketId) {
        io.to(targetSocketId).emit('receive_message', messageData);
        // También enviárselo al remitente para confirmación
        io.to(socket.id).emit('receive_message', messageData);
      }
    }
  });

  // 4. Desconexión
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      console.log(`Usuario desconectado: ${user.name}`);
      users.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`SERVIDOR DE CHAT DEL INSTITUTO CORRIENDO EN PUERTO ${PORT}`);
  console.log(`Listo para recibir conexiones Web y Móviles`);
});
