import React from 'react';
import { Routes, Route, BrowserRouter, } from 'react-router-dom'; // Import Link for navigation
import Home from './pages/Home';
import Create from './pages/Create';
import PaymentPage from './pages/PaymentPage';
import UpdatePage from './pages/updatePage'; // Import the UpdatePage component
import Details from './componets/Details';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSelection from './componets/PaymentSelection';
import Updatedelete from './componets/Updatedelete';
import PaymentHome from './pages/PaymentHome';
import PaymentForm from './componets/paymentForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paymenthome" element={<PaymentHome />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            
            <Route path="/create" element={<Create />} />
            <Route path="/selection" element={<PaymentSelection />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/update/:id" element={<UpdatePage />} />
            <Route path="/updatedelete" element={<Updatedelete />} />
            {/* The :id in the route will allow you to pass the workout ID for updating */}
            <Route path="/details/:id" element={<Details />} />
      
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  
    
  );
}

export default App;