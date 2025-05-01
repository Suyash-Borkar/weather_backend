import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';

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

// Optional API route (your custom logic)
app.get('/weather', (req, res) => {
  res.json({ message: 'Weather endpoint works!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
