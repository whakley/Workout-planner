// src/route/index.js
// This file sets up the Express server and defines API routes for the workout planner application.
const express = require('express');
const cors = require('cors');
const pool = require('../db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Basic route to check if the API is running
app.get('/', (req, res) => {
  res.send('API is running');
});
// API route to get all workouts from the database
app.get('/api/workouts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workouts ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// API route to create a new workout in the database
app.post('/api/workouts', async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO workouts (user_id, title, workout_date, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.body.user_id, req.body.title, req.body.workout_date, req.body.notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// API route to get a specific workout by ID from the database
app.get('/api/workouts/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workouts WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// API route to update a specific workout by ID in the database
app.put('/api/workouts/:id', async (req, res) => {
  try {
    const result = await pool.query('UPDATE workouts SET title = $1, workout_date = $2, notes = $3 WHERE id = $4 RETURNING *',
      [req.body.title, req.body.workout_date, req.body.notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});