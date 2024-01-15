import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }

      const data = await response.json();
      return data.products.name || ''; // Assuming the product object has a "name" property
    } catch (error) {
      console.error('Error fetching product details:', error.message);
      return '';
    }
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/all-orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user orders: ${response.statusText}`);
        }

        const data = await response.json();

        // Fetch product names for each order
        const ordersWithProductNames = await Promise.all(
          data.message.map(async (order) => {
            const productName = await fetchProductDetails(order.productsOrdered[0].productId);
            return {
              ...order,
              productName,
            };
          })
        );

        setOrders(ordersWithProductNames || []);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching user orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Orders</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.productName}</td>
              <td>{order.productsOrdered[0].quantity}</td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserOrders;
