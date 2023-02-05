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
  const submit = (data, formRef) => {
    const { start, end } = data;
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
          <DateField name="start" />
          <DateField name="end" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              console.log('closed');
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
