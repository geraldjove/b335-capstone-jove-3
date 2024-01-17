import React, { useState, useEffect, useContext } from 'react';
import { Card, Col, Button, Modal, FormControl, InputGroup} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductCard({ productProp }) {
  const { productId } = useParams();
  const { _id, name, description, price } = productProp;
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    // Fetch random character from the API
    fetch('https://rickandmortyapi.com/api/character')
    .then((response) => response.json())
    .then((data) => {
      // Get a random index within the range of the array
      const randomIndex = Math.floor(Math.random() * data.results.length);
      
      // Extract image URL from the fetched data using the random index
      const randomCharacter = data.results[randomIndex];
      
      if (randomCharacter && randomCharacter.image) {
        setImage(randomCharacter.image);
      }
    })
    .catch((error) => {
      console.error('Error fetching random character:', error);
    });
  }, []); // Empty dependency array ensures the effect runs only once
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : value);
  };
  
  
  const buyProduct = () => {

    if (quantity === 0) {
      // Display an error message or handle the situation when the quantity is 0
      Swal.fire({
        title: 'Invalid Quantity',
        icon: 'error',
        text: 'Please select a quantity greater than 0.',
      });
      return;
    }
    
    fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({
        productId: _id, // Use the correct product ID from productProp
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('Product is already in the cart. Please proceed to PATCH /carts/update-cart-quantity')
        console.log(_id);
        console.log(data);
        if (data.existingProduct && data.existingProduct.productId !== undefined) {
          // Product is already in the cart, show error modal
          Swal.fire({
            title: 'Product Already in Cart',
            icon: 'error',
            text: 'This product is already in your cart.',
          });
        } else if (data === 'Action Forbidden') {
          Swal.fire({
            title: 'Admin Cart Error',
            icon: 'error',
            text: 'Admin is not allowed to add to the cart.',
          });
        } else {
          Swal.fire({
            title: 'Successfully Added to Cart',
            icon: 'success',
            text: 'You have successfully added this product to your cart.',
          }).then(() => {
            // Redirect to the product page
            navigate(`/b4/products`);
          });
        }
      });
  };
  
  
  return (
    <Col xs={12} sm={6} md={12} className='mt-5'>
    <MDBCard className='bg-shadow'>
    <MDBCardImage src={image} position='top' alt='Random Character' />
    <MDBCardBody>
    <Card.Title className='text-center text-primary'>{name}</Card.Title>
    <Card.Subtitle>Description:</Card.Subtitle>
    <Card.Text>{description}</Card.Text>
    <Card.Subtitle>Price:</Card.Subtitle>
    <Card.Text className='text-danger'>₱ {price}</Card.Text>
    <Button className='w-100' onClick={handleShow}>Details</Button>
    <Modal show={show} onHide={handleClose}>
    <MDBCardImage src={image} position='top' alt='Random Character'/>
    <Modal.Header closeButton>
    <Modal.Title>{name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Card.Subtitle>Description:</Card.Subtitle>
    <Card.Text>{description}</Card.Text>
    <Card.Subtitle>Price:</Card.Subtitle>
    <Card.Text className='text-danger'>PhP {price}</Card.Text>
    <Card.Subtitle className='text-center'>Quantity:</Card.Subtitle>
    <InputGroup className='w-50 d-flex mx-auto'>
    <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
    <FormControl 
    aria-label="Quantity"
    value={quantity}
    onChange={handleInputChange}
    className='text-center'
    />
    <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
    </InputGroup>
    {user.id !== null ? (
      
      <Button className='d-flex mx-auto mt-2' variant="primary" block onClick={buyProduct}>
  Add to Cart
</Button>
      
      ) : (
        <Link to="/b4/login"  style={{ textDecoration: "none" }}>
        <Button className='btn btn-danger d-flex mx-auto mt-2' >Log in to Buy</Button>
        </Link>
        )}
        </Modal.Body>
        </Modal>
        </MDBCardBody>
        </MDBCard>
        </Col>
        );
      }
      