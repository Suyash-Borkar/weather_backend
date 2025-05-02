import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';  // Import dotenv to load environment variables

dotenv.config();  // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet());
app.use(morgan('dev'));

// Serve static files from 'public' (including index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Weather API Route
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City not provided' });
  }

  try {
    // Use the environment variable for API key
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(weatherApiUrl);
    
    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();

    // Format the data to return the relevant weather information
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
