import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Card, Carousel } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import ListRoomIndexPOSTComponent from '../components/Roomthings/ListRoomIndexPOSTComponent';
import SearchBar from '../components/SearchBar';

/* Renders a table containing all of the Room documents. Use <RoomItem> to render each row. */
const ListRoom = () => {
  const [roomList, setList] = useState([]);

  document.title = 'Rooms';
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, rooms } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Room documents.
    const subscription = Rooms.subscribeRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const roomItems = Rooms.find({}, { sort: { roomNumber: 1 } }).fetch();
    setList(roomItems);
    return {
      rooms: roomItems,
      ready: rdy,
    };
  }, []);

  // filter room number and location from search bar
  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(rooms.filter(room => (`${room.roomNumber} + ' ' + ${room.location}`).toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (ready ? (
    <Container id={PAGE_IDS.LIST_ROOM} className="py-3">
      <Row>
        <Col>
          <Card>
            <Card.Header style={{ height: '5rem' }} className="py-3"><SearchBar handleSearch={handleSearch} /></Card.Header>
            <Card.Body style={{ height: '30rem' }}>
              <Carousel interval={null} variant="dark">
                <Carousel.Item>
                  <Carousel.Caption>
                    <h3 className="text-warning">Map of Keller HALL</h3>
                  </Carousel.Caption>
                  <img
                    style={{ height: '28rem', width: '43rem' }}
                    src="/images/KELLER.png"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Carousel.Caption>
                    <h3 className="text-warning">Map of POST</h3>
                  </Carousel.Caption>
                  <img
                    style={{ height: '28rem', width: '43rem' }}
                    src="/images/POST.png"
                    alt="Second slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '35rem' }}>
            <Card.Header style={{ height: '3rem' }}>INDEX</Card.Header>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Pacific Ocean Science and Technology 3rd Floor Rooms</Accordion.Header>
                <Accordion.Body>
                  <h4>List of Rooms in POST</h4>
                  <div className="scroll">{roomList.map((room) => <ListRoomIndexPOSTComponent key={room._id} room={room} />)} </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Keller Hall</Accordion.Header>
                <Accordion.Body>
                  <h4>List of Keller Hall Rooms</h4>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Room" />);
};

export default ListRoom;
