import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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

    fetchWorkouts();
  }, []);

  return (
    <div className="app">
      <h1>Workout Tracker</h1>

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