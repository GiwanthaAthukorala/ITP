import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import UpdateForm from '../componets/UpdateForm';
import { useParams } from 'react-router-dom';

<ToastContainer autoClose={3000} position="top-right" hideProgressBar={false} />

const UpdatePage = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [successMessage] = useState('');

  const onUpdate = async (workoutId, updatedWorkout) => {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkout),
      });
  
      if (response.ok) {
        console.log(`Workout with ID ${workoutId} has been updated.`);
        toast.success('Delivary details has been successfully updated', {
          position: 'top-right',
          background: 'blue',
          border:'2 px solid blue'
        });
      } else {
        console.error(`Failed to update workout with ID ${workoutId}.`);
        toast.error('Failed to update workout', {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred', {
        position: 'top-right',
      });
    }
  };
  

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setWorkout(data);
        } else {
          console.error('Failed to fetch workout data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchWorkout();
  }, [id]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-page">
      <h1>Update Delivery Details</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <UpdateForm workoutId={id} onUpdate={onUpdate} workout={workout} />
    </div>
  );
};

export default UpdatePage;