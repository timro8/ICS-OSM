import React from 'react';
import PropTypes from 'prop-types';
import { Download } from 'react-bootstrap-icons';
import { downloadCsv } from '../../api/utilities/downloadCsv';
import CircleButton from './CircleButton';

/* Use CollectionName.dumpAll() when passed to 'collection' prop */
const DownloadCSVButton = ({ collection }) => (
  <CircleButton onClick={() => downloadCsv(collection)} variant="dark" tooltip="Download CSV">
    <Download />
  </CircleButton>
);

DownloadCSVButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default DownloadCSVButton;
