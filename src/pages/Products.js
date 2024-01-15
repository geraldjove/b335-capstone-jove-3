import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const fetchUrl = user?.isAdmin
        ? `${process.env.REACT_APP_API_URL}/products/all`
        : `${process.env.REACT_APP_API_URL}/products/`;

      const response = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return user?.isAdmin ?
   <AdminView productsData={products} fetchData={fetchData} /> 
   :
    <UserView productsData={products}/>;
}
