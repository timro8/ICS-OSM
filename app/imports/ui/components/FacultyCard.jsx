import React, { useState } from 'react';
import { Button, Card, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FacultyDetail from './FacultyDetail';

const FacultyCard = props => {

  // eslint-disable-next-line react/prop-types
  const { room, name, office_hours } = props;

  // show pop up to show faculty detail information
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
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

      { /* pop up for faculty detail */ }
      <FacultyDetail show={showDetail} onClose={() => setShowDetail(false)} />
    </>
  );
};

FacultyCard.propTypes = {
  props: PropTypes.shape({
    room: PropTypes.number,
    name: PropTypes.string,
    office_hours: PropTypes.string,
  }).isRequired,
};

export default FacultyCard;
