const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Endpoint vivo.');
});

app.post('/', async (req, res) => {
  console.log('POST iniciado - Debug start');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Datos recibidos:', req.body);
  console.log('IP detectada:', ip);

  try {
    console.log('Llamando API ipapi...');
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    console.log('Localidad desde IP:', geoData);
  } catch (err) {
    console.error('Error en API ipapi:', err);
  }

  console.log('POST terminado - Debug end');
  res.sendStatus(200);
});

module.exports = app;