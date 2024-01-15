// ProductSearch.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ProductSearch({ onSearch }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [productName, setProductName] = useState('');

  const handleSearch = async () => {
    try {
      const searchCriteria = {
        minPrice: parseFloat(minPrice),
        maxPrice: parseFloat(maxPrice),
        productName,
      };
  
      let fetchUrl;
  
      if (searchCriteria.minPrice !== '' && searchCriteria.maxPrice !== '') {
        // Search by price range
        fetchUrl = `${process.env.REACT_APP_API_URL}/products/searchByPrice`;
      } else if (searchCriteria.productName !== '') {
        // Search by name
        fetchUrl = `${process.env.REACT_APP_API_URL}/products/searchByName`;
      } else {
        // No valid search criteria
        return;
      }
  
      const response = await fetch(fetchUrl, {
        method: 'POST', // Use POST for sending data in the request body
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify(searchCriteria),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
      onSearch(data.products || []);
    } catch (error) {
      console.error('Error searching products:', error.message);
    }
  };

  return (
    <Form>
      <Form.Group controlId="minPrice">
        <Form.Label>Min Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="maxPrice">
        <Form.Label>Max Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="productName">
        <Form.Label>Product Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
}
