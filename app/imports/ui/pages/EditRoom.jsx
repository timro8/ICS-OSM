import React from 'react';
import { useParams } from 'react-router';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Col, Row } from 'react-bootstrap';
import { Rooms } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

// form based on Rooms collection
const bridge = new SimpleSchema2Bridge(Rooms._schema);

const statusList = ['Occupied', 'Vacant', 'Out of Commission', 'Other'];

const classificationList = ['Office', 'Sink', 'Conference', 'Cubicle', 'ICS Library', 'ASECOLAB', 'Mail', 'Main Office', 'Lab', 'ICSpace', 'Storage', 'ICS IT', 'OFCSVC', 'LNG'];

/* Renders the Edit Room. */
const EditRoom = () => {
  const { _id } = useParams();
  // subscriptions and ready
  const { doc, ready } = useTracker(() => {
    // Get access to RoomEquipments documents (Admin).
    const subscription = Rooms.subscribeRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document based on the equipmentId
    const document = Rooms.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // data submitted to edit a room. If there are errors, an error message will pop up. If the data is successfully updated, a success message will appear.
  const submit = (data) => {
    const { status, capacity, roomSqFoot, roomClassification, picture } = data;
    const collectionName = Rooms.getCollectionName();
    const updateData = { id: _id, status, capacity, roomSqFoot, roomClassification, picture };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Room updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_ROOM} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Room: {doc.roomNumber}</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <SelectField name="status" allowedValues={statusList} />
            <NumField name="capacity" decimal={null} />
            <TextField name="roomSqFoot" />
            <SelectField name="roomClassification" allowedValues={classificationList} />
            <TextField name="picture" />
            <SubmitField value="Submit" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Room details" />;
};

export default EditRoom;
