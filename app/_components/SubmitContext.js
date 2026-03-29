"use client"

import { createContext, useContext, useState } from "react"

const SubmitContext = createContext();

export function SubmitProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <SubmitContext.Provider value={{ loading, setLoading }} >
      {children}
    </SubmitContext.Provider>
  );
}

export function useSubmit() {
  return useContext(SubmitContext);

}