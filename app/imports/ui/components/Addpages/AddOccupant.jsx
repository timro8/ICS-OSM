import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Button, Modal } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, HiddenField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StaffProfiles } from '../../../api/user/StaffProfileCollection';
import { OccupantRoom } from '../../../api/user/OccupantRoomCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../LoadingSpinner';

// form schema based on the Equipment collection
const formSchema = new SimpleSchema({
  roomKey: String,
  occupant: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddOccupant component for adding a new occupant. */
const AddOccupant = ({ roomKey }) => {
  // eslint-disable-next-line react/prop-types
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userList, ready } = useTracker(() => {
    const subFac = FacultyProfiles.subscribeFacultyProfileAdmin();
    const subStaff = StaffProfiles.subscribeStaffProfileAdmin();
    const docFac = FacultyProfiles.find().fetch();
    const docStaff = StaffProfiles.find().fetch();
    const rdy = subFac.ready() && subStaff.ready();
    const allUsers = _.extend([], docFac, docStaff);
    return {
      userList: allUsers,
      ready: rdy,
    };
  });
  const occupantList = userList.map((user) => ({ label: `${user.firstName} ${user.lastName}`, value: user.email }));
  // data added to the OccupantRoom collection. If there are errors, an error message will appear. If the data is submitted successfully, a success message will appear. Upon success, the form will reset for the user to add additional occupant.
  const submit = (data, formRef) => {
    const collectionName = OccupantRoom.getCollectionName();
    const email = data.occupant;
    const definitionData = { email, roomKey };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Occupant assigned successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return ready ? (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Add Occupant
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Occupant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Add Occupant
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <SelectField name="occupant" options={occupantList} />
            <SubmitField value="submit" />
            <ErrorsField />
            <HiddenField name="roomKey" value={roomKey} />
          </AutoForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : <LoadingSpinner />;
};

AddOccupant.propTypes = {
  roomKey: PropTypes.string.isRequired,
};

export default AddOccupant;
