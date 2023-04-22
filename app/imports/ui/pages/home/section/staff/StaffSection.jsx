import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Table, Button, Row } from 'react-bootstrap';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AddStaffForm from '../../../../components/Addpages/AddStaffForm';
import AdminPageStaffComponent from '../../../../components/AdminPage/AdminPageStaffComponent';
import { Rooms } from '../../../../../api/room/RoomCollection';
import { OccupantRoom } from '../../../../../api/user/OccupantRoomCollection';
import { StaffProfiles } from '../../../../../api/user/StaffProfileCollection';
import { ROLE } from '../../../../../api/role/Role';

function getStaffData(staff) {
  const roomOccupant = _.pluck(OccupantRoom.find({ userId: staff._id }).fetch(), 'roomId');
  const rooms = [];
  roomOccupant.map(r => rooms.push(Rooms.find({ _id: r }).fetch()));
  return _.extend({}, staff, { office: rooms });
}
/* Renders a table containing all of the Staff documents. Use <Admin> to render each row in each tabs. */
const StaffSection = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [show, setShow] = useState(false);
  const { roomsData, ready } = useTracker(() => {
    // Get access to Staff documents.
    const subscription1 = StaffProfiles.subscribeStaffProfileAdmin();
    const subOccupantRoom = OccupantRoom.subscribeOccupantRoomAdmin();
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subOccupantRoom.ready();
    const docStaff = StaffProfiles.find().fetch();
    const roomData = docStaff.map(s => getStaffData(s));

    return {
      roomsData: roomData,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Row className="simple-card">
      <div className="d-flex justify-content-between align-items-center" style={{ margin: '15px 0' }}>
        <h2>Staffs</h2>
        {/** Button for adding staff profiles, ONLY ADMIN & OFFICE can do this! */}
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
          [<Button key={Math.random()} style={{ width: '15rem' }} variant="primary" onClick={() => setShow(true)}>Add Staff</Button>]
        ) : ''}
        <AddStaffForm show={show} onClose={() => setShow(false)} key={Math.random()} />
      </div>
      <div className="scroll" style={{ height: '30rem' }}>
        <Table hover className="scroll">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Room</th>
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
                <th className="text-end">Actions</th>
              ) : ''}
              {/** Empty header but it is reserved for deletion button from staffcard component */}
              <th> </th>
            </tr>
          </thead>
          {/** Reiterates/Maps objects through the StaffProfileCollection.js */}
          <tbody>
            {roomsData.map((staff) => <AdminPageStaffComponent key={staff._id} staff={staff} staffProfile={staff} />)}
          </tbody>
        </Table>
      </div>
    </Row>
  ) : <LoadingSpinner />);
};

export default StaffSection;
