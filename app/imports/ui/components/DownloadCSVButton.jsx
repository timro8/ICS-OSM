import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { downloadCsv } from '../../api/utilities/downloadCsv';

/* Use CollectionName.dumpAll() when passed to 'collection' prop */
const DownloadCSVButton = ({ collection }) => (
  <Button onClick={() => downloadCsv(collection)}>Download as CSV</Button>
);

DownloadCSVButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default DownloadCSVButton;
