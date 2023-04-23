import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

/* A simple static component to render some text for the search bar. */
const SearchBar = ({ handleSearch }) => {
  const [filter, setFilter] = useState('');
  const handleClick = () => {
    handleSearch(filter);
  };

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
      event.preventDefault();
      document.getElementById('search-button').click();
    }
  });

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Form className="search-input">
        <Form.Control type="text" onChange={(event) => setFilter(event.target.value)} placeholder="Search..." />
        <Button id="search-button" onClick={handleClick}><Search style={{ display: 'grid', justifyContent: 'center' }} /></Button>
      </Form>
    </Container>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  handleSearch: () => '',
};

export default SearchBar;
