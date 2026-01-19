const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Datos recibidos:', req.body);
  console.log('IP:', ip);

  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    console.log('Localidad desde IP:', geoData);
  } catch (err) {
    console.error('Error API:', err);
  }

  res.sendStatus(200);
});

module.exports = app;