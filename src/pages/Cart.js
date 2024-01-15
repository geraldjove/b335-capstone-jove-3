import React, { useState, useEffect } from "react";
import { Button, Table } from 'react-bootstrap';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        // Fetch cart data from your database or API
        fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            // Extract cartItems from the response
            const cartItems = data.message.cartItems || [];
            
            // Fetch product details for each item in the cart
            const fetchProductDetails = cartItems.map((item) =>
            fetch(`${process.env.REACT_APP_API_URL}/products/${item.productId}`)
            .then((res) => res.json())
            );
            
            // Resolve all promises for fetching product details
            Promise.all(fetchProductDetails)
            .then((productDetails) => {
                // Merge product details into cartItems
                const updatedCartItems = cartItems.map((item, index) => ({
                    ...item,
                    name: productDetails[index].products.name,
                    price: productDetails[index].products.price,
                    // Add other product details as needed
                }));
                
                // Set the updated cart items in the state
                setCartItems(updatedCartItems);
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
        })
        .catch((error) => {
            console.error('Error fetching cart data:', error);
        });
    }, []); // Empty dependency array ensures that this effect runs only once on component mount

    const handleCheckout = () => {
        // Perform the checkout operation
        fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
          body: JSON.stringify({
            // Include any necessary data for the checkout operation
            // For example, you might want to send the list of products in the cart
            cartItems,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // Handle the response from the server
            console.log('Checkout successful:', data);
            // You can add further actions or UI updates based on the server response
          })
          .catch((error) => {
            console.error('Error during checkout:', error);
          });
      };
    
    
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Your Shopping Cart</h1>
        <Table striped bordered hover responsive>
        <thead>
        <tr className="text-center">
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {cartItems.map((item) => (
            <tr key={item.productId} className="text-center">
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.subtotal}</td>
            <td>
            {/* Add your action buttons here, e.g., remove item */}
            <Button variant="danger">Remove</Button>
            </td>
            </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
            <td colSpan={3}>
            <Button variant="success" className="text-center rounded-0" size="lg" onClick={handleCheckout}>
                Checkout
              </Button>
              </td>
            <td colSpan={2}className="text-right">Total: {cartItems.reduce((total, item) => total + item.subtotal, 0)}</td>
            </tr>
            </tfoot>
            </Table>
            

            </div>
            );
        }