const express = require('express');
const fetch = require('node-fetch'); // Instala esto si no lo tienes
const app = express();
app.use(express.json());

app.post('/location', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Datos recibidos:', req.body); // Geoloc, userAgent, etc.
  console.log('IP:', ip);

  // Enriquecer con datos de localidad via API (ciudad, país, etc.)
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoRes.json();
    console.log('Localidad desde IP:', geoData); // city, country, region, etc.
  } catch (err) {
    console.error('Error API:', err);
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log('Servidor corriendo'));