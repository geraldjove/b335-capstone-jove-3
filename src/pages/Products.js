import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import { Navigate } from 'react-router-dom';
import ProductSearch from '../components/ProductSearch';

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const handleSearch = (searchCriteria) => {
    // Implement the search logic based on search criteria
    const filtered = products.filter((product) => {
      const isInRange =
        (searchCriteria.minPrice === '' || product.price >= searchCriteria.minPrice) &&
        (searchCriteria.maxPrice === '' || product.price <= searchCriteria.maxPrice);

      const containsName =
        searchCriteria.productName === '' ||
        product.name.toLowerCase().includes(searchCriteria.productName.toLowerCase());

      return isInRange && containsName;
    });

    setFilteredProducts(filtered);
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    user?.isAdmin ? (
      <>
        <ProductSearch onSearch={handleSearch} />
        <AdminView productsData={products} fetchData={fetchData} /> 
      </>
    ) : (
      <>
        <ProductSearch onSearch={handleSearch} />
        <UserView productsData={products} />
      </>
    )
  );
  
  
}
