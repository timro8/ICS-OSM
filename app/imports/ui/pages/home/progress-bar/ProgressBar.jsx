import { ProgressBar } from 'react-bootstrap';
import React from 'react';

const getProgressBar = (title, number) => (
  <div style={{ width: '25rem' }}>
    {title}
    <ProgressBar now={number} />
  </div>
);

export const OccupiedProgressBar = () => getProgressBar('Rooms Occupied', 42);

export const VacantProgressBar = () => getProgressBar('Rooms Vacant', 9);

export const OutOfCommissionProgressBar = () => getProgressBar('Rooms Out Of Commission', 3);

// TODO: replace the numbers with actual data
