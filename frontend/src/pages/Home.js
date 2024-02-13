import React, { useEffect } from "react";
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import Details from '../componets/Details'; // Corrected import path


const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();



  const handleUpdate = async (id, updatedWorkout) => {
    try {   
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedWorkout),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      } else {
        // Handle the error condition if needed
        console.error('Failed to update workout');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: data });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchWorkouts();
  }, [dispatch]);
  

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <Details key={workout._id} workout={workout}  onUpdate={handleUpdate} />

         
        ))}
      </div>
      
    </div>
  );
}

export default Home;
