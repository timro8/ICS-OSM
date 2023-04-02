import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../../utilities/PageIDs';
import FacultySection from './section/faculty/FacultySection';
import ReservationsSection from './section/reservation/ReservationsSection';
import { OccupiedProgressBar, VacantProgressBar, OutOfCommissionProgressBar } from './progress-bar/ProgressBar';
import PostThirdFloorSection from './section/map/POST-third-floor/PostThirdFloor';
import StudentSection from './section/student/StudentSection';

const Home = () => (
  <Container id={PAGE_IDS.HOME} className="py-3">
    <Row className="d-flex justify-content-between">
      <OccupiedProgressBar />
      <VacantProgressBar />
      <OutOfCommissionProgressBar />
    </Row>
    <PostThirdFloorSection />
    <FacultySection />
    <StudentSection />
    <ReservationsSection />
  </Container>
);

export default Home;
