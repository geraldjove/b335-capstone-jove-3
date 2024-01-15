import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
  const { productId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const enroll = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({
        courseId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Enrolled Successfully.') {
          Swal.fire({
            title: 'Successfully enrolled',
            icon: 'success',
            text: 'You have successfully enrolled for this course',
          });
        } else if (data === 'Action Forbidden') {
          Swal.fire({
            title: 'Admin enrollment error',
            icon: 'error',
            text: 'Admin is not allowed to enroll',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.',
          });
        }
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setName(data.products.name);
        setDescription(data.products.description);
        setPrice(data.products.price);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>
              {user.id !== null ? (
                <Button variant="primary" block onClick={() => enroll(productId)}>
                  Buy
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Log in to Buy
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
