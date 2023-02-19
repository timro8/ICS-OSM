import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubItem = ({ club }) => (
  <tr>
    <td>{club.clubName}</td>
    <td>{}</td>
    <td>{stuff.condition}</td>
    <td>
      <Link className={COMPONENT_IDS.LIST_STUFF_EDIT} to={`/edit/${stuff._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
ClubItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubItem;
