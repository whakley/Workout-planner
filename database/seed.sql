-- Clear old data first (optional, useful for re-running seeds)
DELETE FROM workout_entries;
DELETE FROM workouts;
DELETE FROM users;

-- Reset SERIAL counters back to 1 (optional)
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE workouts_id_seq RESTART WITH 1;
ALTER SEQUENCE workout_entries_id_seq RESTART WITH 1;

-- Seed users
INSERT INTO users (name, email)
VALUES
  ('Wes', 'wes@email.com'),
  ('Maya', 'maya@email.com'),
  ('Alex', 'alex@email.com');

-- Seed workouts
INSERT INTO workouts (user_id, title, workout_date, notes)
VALUES
  (1, 'Leg Day', '2026-03-10', 'Focused on squats and lunges'),
  (1, 'Push Day', '2026-03-12', 'Bench press and shoulder press'),
  (2, 'Pull Day', '2026-03-13', 'Rows and curls'),
  (3, 'Core Day', '2026-03-14', 'Planks and leg raises');

-- Seed workout entries
INSERT INTO workout_entries (workout_id, exercise_name, sets, reps, weight)
VALUES
  (1, 'Back Squat', 4, 8, 185.00),
  (1, 'Walking Lunges', 3, 12, 40.00),
  (1, 'Leg Press', 3, 10, 250.00),

  (2, 'Bench Press', 4, 6, 135.00),
  (2, 'Shoulder Press', 3, 8, 65.00),
  (2, 'Incline Dumbbell Press', 3, 10, 50.00),

  (3, 'Barbell Row', 4, 8, 115.00),
  (3, 'Lat Pulldown', 3, 10, 100.00),
  (3, 'Bicep Curl', 3, 12, 25.00),

  (4, 'Plank', 3, 1, 0.00),
  (4, 'Hanging Leg Raise', 3, 12, 0.00),
  (4, 'Cable Crunch', 3, 15, 50.00);