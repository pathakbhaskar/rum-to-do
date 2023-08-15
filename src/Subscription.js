import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; 

function Subscription() {
    const history = useHistory(); // Get the history object

    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform form submission logic here
  
      // After successful submission, redirect to TodoApp page
      history.push('/todo');
    };
  
    const handleCancel = () => {
      // Redirect to Login page on cancel
      history.push('/');
    };
  return (
    <Container>
      <h2>Subscription Page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Subscribe
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default Subscription;
