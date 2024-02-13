import { useContext } from 'react';
import { Context } from '../context/Context';

export const useWorkoutContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw Error('useWorkoutContext must be used inside a ContextProvider');
  }

  return context;
};
 