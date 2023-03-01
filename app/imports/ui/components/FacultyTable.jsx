import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import AddFacultyForm from './AddFacultyForm';
import AdminPageFacultyComponent from './AdminPage/AdminPageFacultyComponent';
import { Rooms } from '../../api/room/RoomCollection';
import { Events302 } from '../../api/events/Events302Collection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ROLE } from '../../api/role/Role';

/* Renders a table containing all of the Faculty documents. Use <Admin> to render each row in each tabs. */
const FacultyTable = () => {
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
    <div className="scroll" style={{ width: '80rem', height: '30rem' }}>
      <Table striped bordered hover className="scroll">
        <thead>
          <tr>
            <th style={{ width: '75mm' }}>Name</th>
            <th style={{ width: '65mm' }}>Email</th>
            <th style={{ width: '55mm' }}>Role</th>
            <th style={{ width: '30mm' }}>Room</th>
            <th style={{ width: '30mm' }}>{ /* Add Faculty button */ }
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
                [<Button key={Math.random()} style={{ marginLeft: '1vw' }} variant="primary" onClick={() => setShow(true)}>Add Faculty </Button>]
              ) : ''}

              { /* pop up for add faculty */ }
              <AddFacultyForm show={show} onClose={() => setShow(false)} key={Math.random()} />
            </th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => <AdminPageFacultyComponent key={faculty._id} faculty={faculty} facultyProfile={faculty} />)}
        </tbody>
      </Table>
    </div>
  ) : <LoadingSpinner />);
};

export default FacultyTable;
