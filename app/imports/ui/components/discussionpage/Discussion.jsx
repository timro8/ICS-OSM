import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Row, Col } from 'react-bootstrap';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const Discussions = ({ discussion }) => (
  <Card className="py-sm-3 px-2 mb-2">
    <Row className="px-3">
      <Col>
        <Card.Img src={discussion.image} height="200rem" />
      </Col>
      <Col>
        <Card.Subtitle> Posted by: {discussion.owner}</Card.Subtitle>
        <Card.Title>{discussion.title}</Card.Title>
        <Badge pill bg="dark" style={{ width: '10rem' }}>
          {discussion.flair}
        </Badge>
        <Card.Text className="text">{discussion.description}</Card.Text>
      </Col>
    </Row>
  </Card>
);

// Require a document to be passed to this component.
Discussions.propTypes = {
  discussion: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    flair: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Discussions;
