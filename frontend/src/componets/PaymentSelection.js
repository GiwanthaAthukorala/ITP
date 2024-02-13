import React from 'react';
import { Link } from 'react-router-dom';
import "../componets/paymentselect.css"

const PaymentSelection = () => {
  return (
    <div> 
      <h2>Select a Payment Method</h2>
      <ul>
        <li>
          <Link to="/payment">Online Payment</Link>
        </li>
        <li>
          <Link to="/cashondelivary">Cash on Delivery</Link>
        </li>
        <li>
          <Link to="/payment">Credit Card Payment</Link>
        </li>
      </ul>
    </div>
  );
};

export default PaymentSelection;
