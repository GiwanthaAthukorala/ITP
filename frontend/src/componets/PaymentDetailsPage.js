// PaymentDetailsPage.js
import React, { useState } from 'react';
import PaymentDetails from './PaymentDetails';

const PaymentDetailsPage = ({ payments }) => {
  const [filterPaymentType, setFilterPaymentType] = useState('');

  return (
    <div>
      <h1>Payment Details</h1>
      <div>
        <label>
          Filter by Payment Type:
          <select onChange={(e) => setFilterPaymentType(e.target.value)}>
            <option value="">All</option>
            <option value="Online Cash">Online Cash</option>
            <option value="Credit">Credit</option>
          </select>
        </label>
      </div>
      {payments.map((payment, index) => (
        <PaymentDetails
          key={index}
          payment={payment}
          filterPaymentType={filterPaymentType}
        />
      ))}
    </div>
  );
};

export default PaymentDetailsPage;
