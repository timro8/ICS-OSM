import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
/** import { COMPONENT_IDS } from '../../utilities/ComponentIDs'; */

/** Renders a single row of Faculty members in a (Admin) table. See pages/AdminPageFacultyComponent.jsx. */
const AdminPageClubs = ({ Club }) => (
  <tr>
    <td>
      <div><Image roundedCircle src={Club.image} height="35rem" className="px-2" /> {Club.clubName}</div>
    </td>
    <td>{Club.officers}</td>
  </tr>
);

// Require a document to be passed to this component.
AdminPageClubs.propTypes = {
  Club: PropTypes.shape({
    clubName: PropTypes.string,
    image: PropTypes.string,
    officers: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminPageClubs;
