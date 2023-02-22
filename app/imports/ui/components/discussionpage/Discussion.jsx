import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Stack, Image } from 'react-bootstrap';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const Discussions = ({ discussion }) => (
  <Card className="py-sm-3 px-2 mb-3">
    <Stack direction="horizontal" gap={3}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <div><Image className="image" src={discussion.image} /></div>
      <Stack direction="vertical">
        <Card.Subtitle> Posted by: {discussion.owner}</Card.Subtitle>
        <Card.Title>{discussion.title}</Card.Title>
        <Badge pill bg="dark" style={{ width: '10rem' }}>
          {discussion.flair}
        </Badge>
        <Card.Text className="text">{discussion.description}</Card.Text>
      </Stack>
    </Stack>
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
