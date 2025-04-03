import React, { useContext, useEffect, useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import DashBoard from '../components/DashBoard';
import SuperAdminContext from '../contexts/superAdminContext';
import { CRow, CCol } from '@coreui/react';
import axios from 'axios';

const Home = () => {
  const { superAdminData,setSuperAdminData } = useContext(SuperAdminContext);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/getSuperAdminData`)
      .then((response) => {
        console.log('Fetched Data:', response.data);
        setSuperAdminData(response.data); // Update context with fetched data
        console.log('Updated Context:', superAdminData); // Check if context is updated
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log('Error:', err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) {
    // Show a loading spinner or message while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="m-4">
      <DashboardHeader />
    </div>
      <div className="wrapper flex flex-wrap m-4">
        <DashBoard />
      </div>
    </>
  );
};

export default Home;