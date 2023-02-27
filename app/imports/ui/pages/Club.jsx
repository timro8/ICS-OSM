import React, { useState } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/club/Club';

const Club = () => {
  const { _id } = useParams();
  const [club, setClub] = useState([]);
  const { ready } = useTracker(() => {
    const subscription = Clubs.subscribeClub();
    const rdy = subscription.ready();
    setClub(Clubs.find({ _id: _id }, { sort: { clubName: 1 } }).fetch());
    return {
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.CLUB} className="py-3 d-flex align-content-center" fluid>
      <Col className="text-center">
        <Row>
          <h1 className="display-2 green-purple-gradient p-5">{club[0].clubName}</h1>
        </Row>
        <Image src={club[0].image} width="15%" className="pt-3" />
        <Row>
          <div>
            <h3 className="pt-3">ABOUT</h3>
            <Col className="col-4 m-auto">
              <div>{club[0].description}</div>
            </Col>
          </div>
        </Row>
        <Row className="pt-3">
          <h3>OFFICERS</h3>
          <Col>
            <Row className="d-flex justify-content-center">
              {club[0].officers}
            </Row>
          </Col>
        </Row>
        <Row className="pt-3">
          <h3>MEETING</h3>
          <p> {club[0].meetingDay} {club[0].meetingTime} {club[0].meetingLocation}</p>
        </Row>
        <Row className="pt-2">
          <h3>JOIN US</h3>
          <p>{club[0].joinLink}</p>
        </Row>
      </Col>
    </Container>
  ) : <LoadingSpinner message="Loading Club" />);
};

export default Club;
