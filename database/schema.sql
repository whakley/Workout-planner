CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  workout_date DATE NOT NULL,
  notes TEXT
);

CREATE TABLE workout_entries (
  id SERIAL PRIMARY KEY,
  workout_id INTEGER NOT NULL REFERENCES workouts(id),
  exercise_name VARCHAR(100) NOT NULL,
  sets INTEGER,
  reps INTEGER,
  weight NUMERIC(6,2)
);