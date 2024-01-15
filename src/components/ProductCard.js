import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productProp }) {
  const { _id, name, description, price } = productProp;

  return (
    <Col xs={12} sm={6} md={12} className='mt-5'>
      <Card className="mb-4 rounded-0">
        <Card.Body className='text-center'>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>{price}</Card.Text>
          <Link className="btn btn-primary rounded-0" to={`/b4/products/${_id}`}>
            Details
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
