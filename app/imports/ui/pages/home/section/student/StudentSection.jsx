import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Table, Button, Row } from 'react-bootstrap';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import { ROLE } from '../../../../../api/role/Role';
import { StudentProfiles } from '../../../../../api/user/StudentProfileCollection';
import AdminPageStudentComponent from '../../../../components/AdminPage/AdminPageStudentComponent';
import AddStudent from '../../../../components/AddStudent';

/* Renders a table containing all of the Faculty documents. Use <Admin> to render each row in each tabs. */
const StudentSection = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [show, setShow] = useState(false);
  const { students, ready } = useTracker(() => {
    // Get access to Faculty documents.
    const subscription1 = StudentProfiles.subscribeStudentProfile();
    // Determine if the subscription is ready
    const rdy = subscription1.ready();
    // Get the Faculty documents
    const items1 = StudentProfiles.find({}).fetch();
    return {
      students: items1,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Row className="simple-card">
      <div className="d-flex justify-content-between align-items-center" style={{ margin: '15px 0' }}>
        <h2>Students</h2>
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
          <AddStudent show={show} onClose={() => setShow(false)} key={Math.random()} style={{ width: '15rem' }} />
        ) : ''}
      </div>
      <div className="scroll" style={{ height: '30rem' }}>
        <Table hover className="scroll">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => <AdminPageStudentComponent key={student._id} faculty={student} studentProfile={student} />)}
          </tbody>
        </Table>
      </div>
    </Row>
  ) : <LoadingSpinner />);
};

export default StudentSection;
