import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Clubs } from '../../api/club/Clubs';
import ClubItem from '../components/ClubItem';
import SearchBar from '../components/SearchBar';

/* Renders a table containing all of the Club documents. Use <ClubItem> to render each row. */
const ListClub = () => {
  const [clubList, setList] = useState([]);

  document.title = 'Clubs';
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, clubs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Club documents.
    const subscription = Clubs.subscribeClub();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Club documents
    const clubItems = Clubs.find({}, { sort: { clubName: 1 } }).fetch();
    setList(clubItems);
    return {
      clubs: clubItems,
      ready: rdy,
    };
  }, []);

  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(clubs.filter(club => (`${club.clubName} `).toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (ready ? (
    <Container id={PAGE_IDS.CLUB} className="py-3">
      <Row className="justify-content-center">
        <Col md={3}>
          <Col className="text-center">
            <h2>List Club</h2>
          </Col>
          <Card.Header style={{ height: '5rem' }} className="py-3"><SearchBar handleSearch={handleSearch} /></Card.Header>
          <Card.Body>
            {clubList.map((club) => <ClubItem key={club._id} club={club} />)}
          </Card.Body>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Club" />);
};

export default ListClub;
