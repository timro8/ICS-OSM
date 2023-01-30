import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import AddFacultyForm from '../components/AddFacultyForm';
import FacultyDetail from '../components/FacultyDetail';
import SearchBar from '../components/SearchBar';

const Faculty = () => {
  // show pop up to add faculty
  const [show, setShow] = useState(false);

  // show pop up to show faculty detail information
  const [showDetail, setShowDetail] = useState(false);

  // TODO: Add more comments, refactor as a separate component
  function cards(room, name, office_hours) {
    return (
      <Col style={{ marginBottom: '20px' }}>
        <Card className="w-100" border="info" style={{ width: '18rem' }} onClick={() => setShowDetail(true)}>
          <Card.Body>
            <Card.Text>{room}</Card.Text>
            <Card.Text>{name}</Card.Text>
            <Card.Text>{office_hours}</Card.Text>
            <Container style={{
              display: 'grid',
              justifyContent: 'right',
              gridAutoFlow: 'column',
              gridColumnGap: '10px',
            }}
            >
              <Button>Edit</Button>
            </Container>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <Container className="py-3">
      <Container className="faculty-page">
        <SearchBar />
        <Button
          style={{ marginLeft: '1vw', marginBottom: '20px' }}
          variant="primary"
          onClick={() => setShow(true)}
        >Add Faculty
        </Button>
        <AddFacultyForm show={show} onClose={() => setShow(false)} />
        <Row xs="1" md="2" xl="4">
          {cards(307, 'Cam Moore', 'Office Hours')}
          {cards(307, 'Cam Moore', 'Office Hours')}
          {cards(307, 'Cam Moore', 'Office Hours')}
          {cards(307, 'Cam Moore', 'Office Hours')}
          {cards(309, 'Person 1, 2, 3', 'Office Hours')}
          {cards(309, 'Person 1, 2, 3', 'Office Hours')}
          {cards(309, 'Person 1, 2, 3', 'Office Hours')}
        </Row>
      </Container>
      <FacultyDetail show={showDetail} onClose={() => setShowDetail(false)} />
    </Container>
  );
};

export default Faculty;
