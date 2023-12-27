// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 4000; // Puedes cambiar el puerto según tus necesidades

// Configuración de CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Puedes ajustar esto según tus necesidades
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

// Configuración de MySQL
const db = mysql.createConnection({
  host: '34.71.62.234',
  user: 'root',
  password: 'bhepm',
  database: 'Practica3',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión a la base de datos exitosa');
  }
});

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para la consulta a la base de datos
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Realizar la consulta a la base de datos
  const query = `SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?`;
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en la consulta a la base de datos');
    } else {
      if (results.length > 0) {
        // Usuario autenticado
        console.log('Usuario autenticado');
        res.status(200).json({ message: 'Autenticación exitosa' });
      } else {
        // Usuario no encontrado
        console.log('Usuario no encontrado');
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
