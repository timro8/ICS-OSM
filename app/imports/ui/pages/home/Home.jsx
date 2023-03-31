import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../../utilities/PageIDs';
import Faculty from './section/faculty/Faculty';
import ReservationsTable from '../../components/ReservationsTable';
import { OccupiedProgressBar, VacantProgressBar, OutOfCommissionProgressBar } from './progress-bar/ProgressBar';
import PostThirdFloor from './section/map/POST-third-floor/postThirdFloor';

const Home = () => (
  <Container id={PAGE_IDS.HOME} className="py-3">
    <Row className="d-flex justify-content-between">
      <OccupiedProgressBar />
      <VacantProgressBar />
      <OutOfCommissionProgressBar />
    </Row>
    <PostThirdFloor />
    <Faculty />
    <Row className="simple-card">
      <ReservationsTable />
    </Row>
  </Container>
);

export default Home;
