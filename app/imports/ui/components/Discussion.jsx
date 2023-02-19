import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Image } from 'react-bootstrap';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const Discussions = ({ discussion }) => (
  <Card className="py-sm-3 px-2 mb-2">
    <div className="px-3">
      <Card.Subtitle> Posted by: {discussion.firstName} {discussion.lastName}</Card.Subtitle>
      <Card.Title>{discussion.name}</Card.Title>
      <Badge pill bg="dark" style={{ width: '10rem' }}>
        {discussion.flair}
      </Badge>
    </div>
    <Card.Body>{discussion.description}</Card.Body>
    <Card.Body><Image src={discussion.image} fluid /></Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Discussions.propTypes = {
  discussion: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    owner: PropTypes.string,
    description: PropTypes.string,
    flair: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Discussions;
