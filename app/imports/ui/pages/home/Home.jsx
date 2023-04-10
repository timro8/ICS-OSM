import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../../utilities/PageIDs';
import FacultySection from './section/faculty/FacultySection';
import ReservationsSection from './section/reservation/ReservationsSection';
import ProgressBars from './progress-bar/ProgressBar';
import PostThirdFloorSection from './section/map/POST-third-floor/PostThirdFloor';
import StudentSection from './section/student/StudentSection';
import { ROLE } from '../../../api/role/Role';

const Home = () => (
  <Container id={PAGE_IDS.HOME} className="py-3">
    <Row className="d-flex justify-content-between">
      <ProgressBars />
    </Row>
    {/** Do we need a map layout for KELLER? */}
    {/** For the map layout for the third floor of POST, interactive(zoomable and clickable) */}
    <PostThirdFloorSection />
    {/** Need to add something that can delete faculty profiles/users */}
    <FacultySection />
    {/** Only Faculty, Admin, Tech, and Office can see this */}
    {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
      <StudentSection />
    ) : ''}
    {/** Need to add something that can delete Reservations */}
    {/** Only Faculty, Admin, Tech, and Office can see this */}
    {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE, ROLE.TECH, ROLE.FACULTY]) ? (
      <ReservationsSection />
    ) : ''}
  </Container>
);

export default Home;
