import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const Discussions = ({ discussion }) => (
  <tr>
    <td>{discussion.firstName}</td>
    <td>{discussion.owner}</td>
  </tr>
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
