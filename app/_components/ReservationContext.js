'use client';
 
import { createContext, useState, useContext } from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined
}

const ReservationProvider = ({children}) => {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState)

  return (
    <ReservationContext.Provider value={{range, setRange, resetRange}}>
      {children}
    </ReservationContext.Provider>
  )
}

const useReservationContext = () => {
  const context = useContext(ReservationContext);

  return context
}

export { ReservationProvider, useReservationContext }