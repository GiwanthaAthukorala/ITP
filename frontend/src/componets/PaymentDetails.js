import React, { useState } from 'react';

const PaymentDetails = ({ payment }) => {
  const { name, bankname, paymentmethod, createdAt } = payment;
  const [filter, setFilter] = useState('all'); // Default to showing all payments

  const filteredPayments = filterPayments();

  function filterPayments() {
    if (filter === 'all') {
      return [payment];
    } else {
      return [];
    }
  }

  return (
    <div className="paymentdetails">
      <div className="filter-options">
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          Show All
        </label>
        <label>
          <input
            type="radio"
            value="online cash"
            checked={filter === 'online cash'}
            onChange={() => setFilter('online cash')}
          />
          Online Cash
        </label>
        <label>
          <input
            type="radio"
            value="credit"
            checked={filter === 'credit'}
            onChange={() => setFilter('credit')}
          />
          Credit
        </label>
      </div>
      <div>
        {filteredPayments.map((payment, index) => (
          <div key={index}>
            <p><strong>Name: </strong>{payment.name}</p>
            <p><strong>Bank Name: </strong>{payment.bankname}</p>
            <p><strong>Payment Type: </strong>{payment.paymentmethod}</p>
            <p>{payment.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
