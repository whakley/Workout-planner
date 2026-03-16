const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/workouts', (req, res) => {
  res.json([
    { id: 1, title: 'Leg Day', workout_date: '2026-03-10' },
    { id: 2, title: 'Push Day', workout_date: '2026-03-12' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});