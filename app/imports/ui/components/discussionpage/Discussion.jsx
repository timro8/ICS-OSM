import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Stack, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const Discussions = ({ discussion }) => (
  <Card className="py-sm-3 px-2 mb-3">
    <Stack direction="horizontal" gap={3}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <div><Image className="image" src={discussion.image} height="200rem" width="200rem" thumbnail /></div>
      <Stack direction="vertical">
        <Card.Subtitle> Posted by: <Link key="creator" to={`/profile/:id/${discussion.owner}`}>{discussion.owner} </Link> </Card.Subtitle>
        <Card.Title>{discussion.title}</Card.Title>
        <Badge pill bg="dark" style={{ width: '10rem' }}>
          {discussion.flair}
        </Badge>
        <Card.Text className="text" style={{ height: '5rem' }}>{discussion.description}</Card.Text>
        <Button style={{ width: '10rem' }}>View</Button>
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
    _id: PropTypes.string,
  }).isRequired,
};

export default Discussions;
