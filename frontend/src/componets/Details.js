import React, { useState } from 'react';
import{Link} from'react-router-dom';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import "../componets/details.css";

const Details = ({ workout, onDelete }) => {
  const { dispatch } = useWorkoutContext();
  

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      } else { 
        console.error('Failed to delete workout');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="workout-details">
      <table className="details-table">
        <tbody>
          <tr>
            <td><strong>First Name:</strong></td>
            <td>{workout.firstname}</td>
          </tr>
          <tr>
            <td><strong>Last Name:</strong></td>
            <td>{workout.lastname}</td>
          </tr>
          <tr>
            <td><strong>Phone Number:</strong></td>
            <td>{workout.phonenumber}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{workout.email}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{workout.address}</td>
          </tr>
          <tr>
            <td><strong>Country:</strong></td>
            <td>{workout.country}</td>
          </tr>
          <tr>
            <td><strong>City:</strong></td>
            <td>{workout.city}</td>
          </tr>
          <tr>
            <td><strong>Created At:</strong></td>
            <td>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</td>
          </tr>
        </tbody>
      </table>
      <div className="action-buttons-container">
        <div className="action-buttons">
          <span className="material-symbols-outlined" onClick={handleDeleteClick}>Delete</span>
          {/* Use Link to navigate to the update page with the workout ID */}
          <Link to={`/update/${workout._id}`}>
            <button>Update</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;