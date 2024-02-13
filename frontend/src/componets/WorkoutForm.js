import React, { useState } from "react";
import "../componets/workoutForm.css";


const WorkoutForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation functions
    const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
    const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

    const validationErrors = [];

    if (!validatePhoneNumber(phonenumber)) {
      validationErrors.push("Phone number must be exactly 10 digits.");
    }

    if (!validateEmail(email)) {
      validationErrors.push("Invalid email address. Please enter a valid email.");
    }

    if (validationErrors.length > 0) {
      setEmptyFields(validationErrors);
      setError("Please fix the errors in the form.");
      return;
    }

    const workout = {
      firstname,
      lastname,
      phonenumber,
      email,
      address,
      country,
      city,
    };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setCountry("");
      setCity("");
      setError(null);
      setEmptyFields([]);
      console.log("New workout added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Enter Your Delivery Details</h3>

      <label>First Name</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstname}
        className={emptyFields.includes("firstname") ? "error" : ""}
      />

      <label>Last Name</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastname}
        className={emptyFields.includes("lastname") ? "error" : ""}
      />

      <label>Phone Number</label>
      <input
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phonenumber}
        className={emptyFields.includes("phonenumber") ? "error" : ""}
      />
      <label>Email</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes("email") ? "error" : ""}
      />

     <label>Address</label>
        <input
         type="text"
         onChange={(e) => setAddress(e.target.value)}
         value={address}
         className={`${
        emptyFields.includes("address") ? "error" : ""
         } address-input`}
        />

      
      <label>Country</label>
      <input
      
        type="text"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        className={emptyFields.includes("country") ? "error" : ""}
      />
      <label>City</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={emptyFields.includes("city") ? "error" : ""}
      />

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
