import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/club/Clubs';

const Club = () => {
  const { _id } = useParams();
  const [club, setFaculty] = useState([]);
  const { ready } = useTracker(() => {
    const subscription = Clubs.subscribeClub();
    const rdy = subscription.ready();
    setFaculty(Clubs.find({ _id: _id }, { sort: { clubName: 1 } }).fetch());
    return {
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.CLUB} className="py-3" fluid>
      <Row>
        <h1>{club.clubName}</h1>
      </Row>
      <hr />
      <p>{club.website}</p>
      <h3>ABOUT</h3>
      <p>{club.description}</p>
      <h3>OFFICERS</h3>
      <Col>
        <Row>
          {club.officers}
        </Row>
      </Col>
      <h3>MEETING TIMES</h3>
      <p>{club.meetingDay} {club.meetingTime} @ {club.meetingLocation}</p>
      <h3>JOIN US</h3>
      <p>{club.joinLink}</p>
    </Container>
  ) : <LoadingSpinner message="Loading Club" />);
};

export default Club;
