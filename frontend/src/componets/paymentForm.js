import React, { useState, useEffect } from 'react';
import "../componets/payment.css";

const PaymentForm = () => {
  const [name, setName] = useState("");
  const [bankname, setBankname] = useState("");
  const [paymentmethod, setPaymentmethod] = useState("");
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const [paymentResult, setPaymentResult] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Validate card number
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(paymentData.cardNumber)) {
      setError("Invalid card number. It should be a 16-digit number.");
      return;
    }

    // Validate card expiry (assuming it's in MM/YY format)
    const cardExpiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!cardExpiryRegex.test(paymentData.cardExpiry)) {
      setError("Invalid card expiry. Use MM/YY format.");
      return;
    }

    // Validate CVC (3 digits)
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(paymentData.cardCVC)) {
      setError("Invalid CVC. It should be a 3-digit number.");
      return;
    }

    // Simulate a payment result (you would replace this with actual payment logic)
    const simulatedPaymentResult = Math.random() < 0.5 ? 'success' : 'failure';

    setPaymentResult(simulatedPaymentResult);

    if (simulatedPaymentResult === 'success') {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);
    }

    const payment = { name, bankname, paymentmethod };

    const response = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.console.error)
    }
    if (response.ok) {
      setName("");
      setBankname("");
      setPaymentmethod("");
      setError(null)
      console.log('new payment Details Added', json)
    }
  };

  useEffect(() => {
    if (paymentResult === 'success') {
      // Handle success here, e.g., navigate to a different page
    }
  }, [paymentResult]);

  return (
    <div className="paymentform">
      <form onSubmit={handlePaymentSubmit}>
        <label>Enter Your Full Name</label>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Bank Name</label>
        <input
          type='text'
          onChange={(e) => setBankname(e.target.value)}
          value={bankname}
        />
        <label>Payment Type (Cash, Online, or Credit Payment)</label>
        <input
          type='text'
          onChange={(e) => setPaymentmethod(e.target.value)}
          value={paymentmethod}
        />
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="number"
          id="cardNumber"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleInputChange}
        />
        <label htmlFor="cardName">Cardholder Name</label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={paymentData.cardName}
          onChange={handleInputChange}
        />
        <label htmlFor="cardExpiry">Card Expiry</label>
        <input
          type="text"
          id="cardExpiry"
          name="cardExpiry"
          value={paymentData.cardExpiry}
          onChange={handleInputChange}
        />
        <label htmlFor="cardCVC">CVC</label>
        <input
          type="number"
          id="cardCVC"
          name="cardCVC"
          value={paymentData.cardCVC}
          onChange={handleInputChange}
        />
        <button type="submit">Submit Payment</button>
        {error && <div className='Paymenterror'>{error}</div>}
      </form>
      {showSuccessMessage && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Payment Successful!</h2>
            <button onClick={() => setShowSuccessMessage(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
