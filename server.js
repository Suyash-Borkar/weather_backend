const express = require('express');
// const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(`Requesting URL: ${url}`);  // Debug log

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      res.status(404).json({ error: "City not found" });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
