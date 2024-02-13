const Workout = require("../models/WorkoutModels");
const mongoose = require('mongoose');
const Payment = require('../models/PaymetModels');

// Get All Workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Single Workout
const getWorkout = async (req, res) => { 
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'No such Workout' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create New Workout
const createWorkout = async (req, res) => {
  const { firstname, lastname, phonenumber, email, address, country, city } = req.body;

  let emptyFields = []

  if (!firstname) {
    emptyFields.push('firstname')
  }     
  if (!lastname) {
    emptyFields.push('lastname')
  }
  if (!phonenumber) {
    emptyFields.push('phonenumber')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!address) {
    emptyFields.push('address')
  }
  if (!country) {
    emptyFields.push('country')
  }
  if (!city) {
    emptyFields.push('city')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add Doc to DB 
  try {
    const newWorkout = await Workout.create({ firstname, lastname, phonenumber, email, address, country, city });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: 'No such Workout' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });

    if (!workout) {
      return res.status(404).json({ error: "No such Workout" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//payments 
// Get All Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Single Payment
const getPayment = async (req, res) => { 
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Payment' });
  }

  try {
    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ error: 'No such Payment' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create New Payment
const createPayment = async (req, res) => {
  const { name, bankname, paymentmethod } = req.body;

  let emptyFields = []

  if (!name) {
    emptyFields.push('name');
  }     
  if (!bankname) {
    emptyFields.push('bankname');
  }
  if (!paymentmethod) {
    emptyFields.push('paymentmethod');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  // Add Doc to DB 
  try {
    const newPayment = await Payment.create({ name, bankname, paymentmethod });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getPayment,
  getPayments,
  createPayment
};
