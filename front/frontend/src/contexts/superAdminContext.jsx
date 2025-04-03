import React, { createContext, useContext, useState } from 'react';

// Create the context
const SuperAdminContext = createContext();

// Create a provider component
export const SuperAdminProvider = ({ children }) => {
  const [superAdminData, setSuperAdminData] = useState(null);

  // Example function to update super admin data
  const updateSuperAdminData = (data) => {
    setSuperAdminData(data=>{
      return {...data}
    });
  };

  return (
    <SuperAdminContext.Provider value={{ superAdminData,setSuperAdminData }}>
      {children}
    </SuperAdminContext.Provider>
  );
};


export default SuperAdminContext;