import React from 'react';
import { Col, Row, Card, Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { StaffProfiles } from '../../api/user/StaffProfileCollection';
import EditStaffProfile from './EditStaffProfile';
import { OccupantRoom } from '../../api/user/OccupantRoomCollection';
import { Rooms } from '../../api/room/RoomCollection';

function getStaffData(staff) {
  const roomOccupant = _.pluck(OccupantRoom.find({ userId: staff }).fetch(), 'roomId');
  const office = [];
  roomOccupant.map(r => office.push(Rooms.find({ _id: r }).fetch()));
  return office;
}
const StaffProfile = () => {
  const { _id } = useParams();
  const { ready, staff } = useTracker(() => {
    const subscription = StaffProfiles.subscribeStaffProfile();
    const subOccupantRoom = OccupantRoom.subscribeOccupantRoomAdmin();
    const rdy = subscription.ready() && subOccupantRoom.ready();
    const allStaff = StaffProfiles.find({ _id: _id }, { sort: { lastName: 1 } }).fetch();
    return {
      ready: rdy,
      staff: allStaff,
    };
  }, [_id]);

  const allOffice = getStaffData(staff[0]._id);
  return (ready ? (
    <Container id={PAGE_IDS.STAFF_PROFILE} className="py-3" fluid>
      <Row>
        <Col className="d-flex justify-content-center py-3">
          <Image id="imgProfile" roundedCircle src={staff[0].image} width="300px" />
        </Col>
      </Row>
      <Card id="cardProfile">
        <Col className="text-center pt-3">
          <h1>{staff[0].firstName} {staff[0].lastName}</h1>
          <p>{staff[0].email}</p>
          <hr />
          <span className="small">Staff Role:</span>
          <p className="fw-bold">{staff[0].role}</p>
          <hr />
          <span className="small">About Me:</span>
          <p className="fw-bold p-2">{staff[0].bio}</p>
          <hr />
          <span className="small">Room Number:</span>
          {allOffice.map((o) => <p key={Math.random()} className="fw-bold">{o[0].roomNumber}</p>)}
          <hr />
          <span className="small">Phone Number</span>
          <p className="fw-bold">{staff[0].phoneNumber}</p>
        </Col>
      </Card>
      <EditStaffProfile id={_id} />
    </Container>
  ) : <LoadingSpinner message="Loading Staff Profile" />);
};

export default StaffProfile;
