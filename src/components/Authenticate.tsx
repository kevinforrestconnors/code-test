import React, { FC, ChangeEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAPI from '../hooks/useAPI';

import './Authenticate.scss';

const Authenticate: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { authenticate } = useAPI();

  function handleSubmit() {
    authenticate(formData);
  }

  return (
    <main className="Authenticate">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>email </Form.Label>
          <Form.Control
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            type="text"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </main>
  );
};

export default Authenticate;
