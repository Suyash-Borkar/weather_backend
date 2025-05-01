import express from 'express';
import fetch from 'node-fetch';  // Use import for node-fetch v3.x+
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      res.status(404).json({ error: "City not found" });
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
