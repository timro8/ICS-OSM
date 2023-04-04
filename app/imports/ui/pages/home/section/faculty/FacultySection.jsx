import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Row } from 'react-bootstrap';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AddFacultyForm from '../../../../components/Addpages/AddFacultyForm';
import AdminPageFacultyComponent from '../../../../components/AdminPage/AdminPageFacultyComponent';
import { FacultyProfiles } from '../../../../../api/user/FacultyProfileCollection';
import { ROLE } from '../../../../../api/role/Role';

/* Renders a table containing all of the Faculty documents. Use <Admin> to render each row in each tabs. */
const FacultySection = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [show, setShow] = useState(false);
  const { faculties, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription1 = FacultyProfiles.subscribeFacultyProfileAdmin();
    // Determine if the subscription is ready
    const rdy = subscription1.ready();
    // Get the Faculty documents
    const items = FacultyProfiles.find({}).fetch();
    return {
      faculties: items,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Row className="simple-card">
      <div className="d-flex justify-content-between align-items-center" style={{ margin: '15px 0' }}>
        <h2>Faculties</h2>
        {/** Need a button for deleting faculty profiles! Either on the faculty card component or here.
          SAME RULES for which roles can see it, TO-DO! */}
        {/** Button for adding faculty profiles, ONLY ADMIN & OFFICE can do this! */}
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
              {/** Empty header but it is reserved for deletion button from facultycard component */}
              <th> </th>
            </tr>
          </thead>
          {/** Reiterates/Maps objects through the FacultyProfileCollection.js */}
          <tbody>
            {faculties.map((faculty) => <AdminPageFacultyComponent key={faculty._id} faculty={faculty} facultyProfile={faculty} />)}
          </tbody>
        </Table>
      </div>
    </Row>
  ) : <LoadingSpinner />);
};

export default FacultySection;
