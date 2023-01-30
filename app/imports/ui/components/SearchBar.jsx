import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

/* A simple static component to render some text for the search bar. */
const SearchBar = () => (
  <Container className="d-flex align-items-center justify-content-center">
    <Form className="search-input">
      <Form.Control placeholder="Search..." />
      <Button><Search /></Button>
    </Form>
  </Container>
);

export default SearchBar;
