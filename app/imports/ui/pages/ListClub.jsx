import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Card, Carousel, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Clubs } from '../../api/club/Clubs';

/* Renders a table containing all of the Room documents. Use <RoomItem> to render each row. */
const ListClub = () => {
  const [clubList, setList] = useState([]);

  document.title = 'Clubs';
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, clubs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Room documents.
    const subscription = Clubs.subscribeClub();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const clubItems = Clubs.find({}, { sort: { clubName: 1 } }).fetch();
    setList(clubItems);
    return {
      clubs: clubItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.CLUB} className="py-3">
      <Row>
        <Col>
          <Card className="w-100" border="info">
            <Card.Body>
              <Row>
                <a style={{ color: 'black', textDecoration: 'none' }} href="/">
                  <Col className="d-flex justify-content-center">
                    <Image roundedCircle src={clubs.image} width="100px" />
                  </Col>
                  <hr />
                  <Col className="d-flex justify-content-center"><Card.Text>{clubs.clubName} </Card.Text></Col>
                  {clubs.map((club) => <ClubItem key={club._id} club={club} />)}
                </a>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Club" />);
};

export default ListClub;
