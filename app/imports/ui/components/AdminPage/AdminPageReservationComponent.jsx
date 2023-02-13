import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const AdminPageReservationComponent = ({ Events302 }) => (
  <tr>
    <td>{Events302.start}</td>
    <td>{Events302.end}</td>
    <td>{Events302.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
AdminPageReservationComponent.propTypes = {
  Events302: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default AdminPageReservationComponent;
