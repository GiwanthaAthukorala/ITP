import React from 'react';
import { Link } from 'react-router-dom';
import "../componets/updatedelet.css"


const updatedelete = () => {
  return (
    <div className='up'>
      <h2>Select a Payment Method</h2>
      <ul className='re'>
        <li className='updd'>
          <Link to="/update/:id">Update To Delivery Data</Link>
        </li>
        <li className='updd'>
          <Link to="/payment">Update to Online Payment</Link>
        </li>
        <li className='updd'>
          <Link to="">Order Delete OR Cancel</Link>
        </li>
      </ul>

      <li>
          <Link className='confirmation' to="">Confirmation</Link>
        </li>
    </div>
  );
};

export default updatedelete;
