import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import { PAGE_IDS } from '../../utilities/PageIDs';

/** Renders a single card in the List Room Admin card. See pages/ListRoomAdmin.jsx. */
const RoomItem = ({ room }) => (
  <Col style={{ marginBottom: '20px' }}>
    <Card border="info" className="w-100">
      <Link className={COMPONENT_IDS.ROOM_DETAILS} to={`/roomdetails/${room._id}`} style={{ color: 'black', textDecoration: 'none' }}>
        <Card.Header>
          <h6>{room.location} {room.roomNumber}</h6>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex justify-content-center pb-3">
              <Image src={room.picture} alt={`${room.roomNumber} picture`} width="100px" rounded />
            </Col>
            <hr />
          </Row>
          <Row>
            <Col>
              {room.occupants.map((o) => <div key={o._id}>{o.firstName} {o.lastName}</div>)}
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>Room capacity:</strong> {room.capacity}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>Status:</strong> {room.status}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>Room classification:</strong> {room.roomClassification}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Link>
      <Card.Footer>
        <Link className={PAGE_IDS.EDIT_ROOM} to={`/editroom/${room._id}`}>Edit Room</Link>
      </Card.Footer>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
RoomItem.propTypes = {
  room: PropTypes.shape({
    roomKey: PropTypes.string,
    roomNumber: PropTypes.string,
    location: PropTypes.string,
    status: PropTypes.string,
    capacity: PropTypes.number,
    _id: PropTypes.string,
    occupants: PropTypes.instanceOf(Array),
    roomClassification: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
