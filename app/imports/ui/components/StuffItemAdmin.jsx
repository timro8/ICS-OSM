import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const StuffItemAdmin = ({ stuff }) => (
  <tr>
    <td>{stuff.name}</td>
    <td>{stuff.owner}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/edit/${stuff._id}`}>Edit Profile</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
StuffItemAdmin.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default StuffItemAdmin;
