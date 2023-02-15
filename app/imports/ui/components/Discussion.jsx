import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const Discussions = ({ discussion }) => (
  <Card>
    <Card.Subtitle> Posted by user: {discussion.firstName}</Card.Subtitle>
    <Card.Title>Title</Card.Title>
    <Badge pill bg="dark" style={{ width: '10rem' }}>
      User-Inputted flair(announcements, important, etc)
    </Badge>
    <Card.Body>{discussion.owner}</Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Discussions.propTypes = {
  discussion: PropTypes.shape({
    firstName: PropTypes.string,
    owner: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Discussions;
