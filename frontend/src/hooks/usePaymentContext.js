import { useContext } from 'react';
import { PaymentContext } from '../context/PaymentContext'; // Adjust the import path

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);

  if (!context) {
    throw Error('usePaymentContext must be used inside a PaymentContextProvider');
  }

  return context;
};
