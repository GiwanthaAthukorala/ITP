import React, { useState, useEffect } from 'react';
import '../componets/update.css';
const UpdateForm = ({ workoutId, onUpdate }) => {
  const [workout, setWorkout] = useState(null);
  const [updatedWorkout, setUpdatedWorkout] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    address: '',
    country: '',
    city: '',
  });

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(`/api/workouts/${workoutId}`);
        if (response.ok) {
          const data = await response.json();
          setWorkout(data);
          setUpdatedWorkout(data);
        } else {
          console.error('Failed to fetch workout data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate and update the workout
    // Implement validation as per your requirements

    onUpdate(workoutId, updatedWorkout);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedWorkout((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <form className="update" onSubmit={handleUpdate}>
      <h3>Update Delivery Details</h3>
      <label>First Name</label>
      <input
        type="text"
        name="firstname"
        value={updatedWorkout.firstname}
        onChange={handleChange}
      />
      <label>Last Name</label>
      <input
        type="text"
        name="lastname"
        value={updatedWorkout.lastname}
        onChange={handleChange}
      />
      <label>Phone Number</label>
      <input
        type="text"
        name="phonenumber"
        value={updatedWorkout.phonenumber}
        onChange={handleChange}
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        value={updatedWorkout.email}
        onChange={handleChange}
      />
      <label>Update Address</label>
      <input
        type="text"
        name="address"
        value={updatedWorkout.address}
        onChange={handleChange}
      />
      <label>Change Country</label>
      <input
        type="text"
        name="country"
        value={updatedWorkout.country}
        onChange={handleChange}
      />
      <label>Change City</label>
      <input
        type="text"
        name="city"
        value={updatedWorkout.city}
        onChange={handleChange}
      />
      <button>Update</button>
    </form>
  );
};

export default UpdateForm;
