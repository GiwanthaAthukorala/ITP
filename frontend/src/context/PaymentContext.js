import React, { createContext, useReducer } from "react";

export const PaymentContext = createContext();

export const PaymentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        payments: action.payload
      };
    case 'CREATE_WORKOUT':
      return {
        payments: [action.payload, ...state.payments]
      };
    default:
      return state;
  }
  
}

export const PaymentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PaymentsReducer, {
    payments: null
  });

  return (
    <PaymentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};
