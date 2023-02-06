import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AutoForm, DateField, SubmitField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Events302 } from '../../../api/events/Events302Collection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';

const formSchema = new SimpleSchema({
  start: Date,
  end: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);
const RoomResModal = ({ show, handleClose, events }) => {
  function isOverlapping(allEvents, start, end) {
    for (let i = 0; i < allEvents.length; i++) {
      // converting existing string dates to date object
      const existingEventStart = new Date(allEvents[i].start);
      const existingEventEnd = new Date(allEvents[i].end);
      // conditionals that check for event overlap
      if (start <= existingEventStart && end >= existingEventEnd) return true;
      if (start >= existingEventStart && end < existingEventEnd) return true;
      if (start > existingEventStart && end <= existingEventEnd) return true;
    }
    return false;
  }

  /* From: https://bobbyhadz.com/blog/javascript-get-previous-day */
  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

    return previous;
  }
  const submit = (data, formRef) => {
    // convert dates into ISO format since JSON doesn't support date objects
    const start = `${data.start.toISOString().split('.')[0]}`;
    const end = `${data.end.toISOString().split('.')[0]}`;
    // check if it overlaps
    const overlaps = isOverlapping(events, new Date(start), new Date(end));
    if (overlaps === true) {
      return swal('Error', 'Invalid start and end times', 'error');
    }
    const owner = Meteor.user().username;
    const collectionName = Events302.getCollectionName();
    const definitionData = { owner, start, end };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Added event', 'success');
        formRef.reset();
      });
  };

  let fRef = null;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserve Room 302</Modal.Title>
      </Modal.Header>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Modal.Body>
          <DateField name="start" min={getPreviousDay()} />
          <DateField name="end" min={getPreviousDay()} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <SubmitField value="Reserve" />
        </Modal.Footer>
      </AutoForm>
    </Modal>
  );
};

RoomResModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
    owner: PropTypes.string,
  })).isRequired,
};

export default RoomResModal;
