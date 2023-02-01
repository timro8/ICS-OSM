import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import AddFacultyForm from '../components/AddFacultyForm';
import SearchBar from '../components/SearchBar';
import FacultyCard from '../components/FacultyCard';
import { PAGE_IDS } from '../utilities/PageIDs';

const Faculty = () => {
  // show pop up to add faculty
  const [show, setShow] = useState(false);

  return (
    <Container className="py-3">
      <Container id={PAGE_IDS.FACULTY}>
        { /* Search Bar */ }
        <SearchBar />

        { /* Add Faculty button */ }
        <Button
          style={{ marginLeft: '1vw', marginBottom: '20px' }}
          variant="primary"
          onClick={() => setShow(true)}
        >Add Faculty
        </Button>

        { /* pop up for add faculty */ }
        <AddFacultyForm show={show} onClose={() => setShow(false)} />

        { /* show all the faculty card */ }
        <Row xs="1" md="2" xl="4">
          <FacultyCard room={307} name="Cam Moore" office_hours="Office Hours" />
          <FacultyCard room={307} name="Cam Moore" office_hours="Office Hours" />
          <FacultyCard room={307} name="Cam Moore" office_hours="Office Hours" />
          <FacultyCard room={307} name="Cam Moore" office_hours="Office Hours" />
          <FacultyCard room={307} name="Cam Moore" office_hours="Office Hours" />
        </Row>
      </Container>
    </Container>
  );
};

export default Faculty;
