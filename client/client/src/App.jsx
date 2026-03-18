import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [notes, setNotes] = useState('');

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/workouts');

      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }

      const data = await response.json();
      setWorkouts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1,
          title,
          workout_date: workoutDate,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create workout');
      }

      const newWorkout = await response.json();

      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      setTitle('');
      setWorkoutDate('');
      setNotes('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Workout Tracker</h1>

      <form className="workout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="date"
          value={workoutDate}
          onChange={(e) => setWorkoutDate(e.target.value)}
          required
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Add Workout</button>
      </form>

      {loading && <p>Loading workouts...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="workout-list">
          {workouts.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            workouts.map((workout) => (
              <div className="workout-card" key={workout.id}>
                <h2>{workout.title}</h2>
                <p>Date: {workout.workout_date}</p>
                <p>Notes: {workout.notes || 'No notes'}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;