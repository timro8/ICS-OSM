import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Row } from 'react-bootstrap';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AddFacultyForm from '../../../../components/AddFacultyForm';
import AdminPageFacultyComponent from '../../../../components/AdminPage/AdminPageFacultyComponent';
import { Rooms } from '../../../../../api/room/RoomCollection';
import { Events302 } from '../../../../../api/events/Events302Collection';
import { FacultyProfiles } from '../../../../../api/user/FacultyProfileCollection';
import { ROLE } from '../../../../../api/role/Role';

/* Renders a table containing all of the Faculty documents. Use <Admin> to render each row in each tabs. */
const FacultySection = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [show, setShow] = useState(false);
  const { faculties, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription1 = FacultyProfiles.subscribeFacultyProfileAdmin();
    const subscription2 = Rooms.subscribeRoomAdmin();
    const subscription3 = Events302.subscribeEvents302Admin();
    // Determine if the subscription is ready
    const rdy = subscription1.ready() && subscription2.ready() && subscription3.ready();
    // Get the Faculty documents
    const items1 = FacultyProfiles.find({}).fetch();
    const items2 = Rooms.find({}).fetch();
    const items3 = Events302.find({}).fetch();
    return {
      faculties: items1,
      rooms: items2,
      events: items3,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Row className="simple-card">
      <div className="d-flex justify-content-between align-items-center" style={{ margin: '15px 0' }}>
        <h2>Faculties</h2>
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
          [<Button key={Math.random()} style={{ width: '15rem' }} variant="primary" onClick={() => setShow(true)}>Add Faculty</Button>]
        ) : ''}
        <AddFacultyForm show={show} onClose={() => setShow(false)} key={Math.random()} />
      </div>
      <div className="scroll" style={{ height: '30rem' }}>
        <Table hover className="scroll">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Room</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty) => <AdminPageFacultyComponent key={faculty._id} faculty={faculty} facultyProfile={faculty} />)}
          </tbody>
        </Table>
      </div>
    </Row>
  ) : <LoadingSpinner />);
};

export default FacultySection;
