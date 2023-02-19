import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Image, Row } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubItem = ({ club }) => (
  <Col style={{ marginBottom: '20px' }}>
    <Card className="w-100" border="success">
      <Card.Body>
        <Row>
          <a style={{ color: 'black', textDecoration: 'none' }} href="/">
            <Col className="d-flex justify-content-center">
              <Image roundedCircle src={club.image} width="100px" />
            </Col>
            <Col className="d-flex justify-content-center"><h4 className="bold">{club.clubName}</h4></Col>
          </a>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
ClubItem.propTypes = {
  club: PropTypes.shape({
    clubName: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    website: PropTypes.string,
    officers: PropTypes.string,
    advisor: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubItem;
