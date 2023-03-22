import React, { useMemo } from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/club/Club';
import { ClubOfficers } from '../../api/clubofficers/ClubOfficersCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import EditClub from '../components/EditClub';

const Club = () => {
  const { _id } = useParams();
  console.log(_id);
  const { ready, club, officers, students } = useTracker(() => {
    const clubSubscription = Clubs.subscribeClub();
    const officerSubscription = ClubOfficers.subscribeClubOfficers();
    const studentSubscription = StudentProfiles.subscribeStudentProfile();
    const rdy = clubSubscription.ready() && officerSubscription.ready() && studentSubscription.ready();
    const oneClub = Clubs.find({ _id: _id }, { sort: { clubName: 1 } }).fetch();
    const allOfficers = ClubOfficers.find().fetch();
    const allStudents = StudentProfiles.find().fetch();

    return {
      ready: rdy,
      club: oneClub,
      officers: allOfficers,
      students: allStudents,
    };
  }, [_id]);

  const getEmails = (officerData, studentData) => {
    const filteredOfficers = officerData.filter((o) => o.clubId === club[0].clubName);
    const arr = [];
    // iterates through officers and looks for student, when found combine position and name
    filteredOfficers.forEach(officer => {
      const foundStudent = studentData.find(student => student.email === officer.studentId);
      if (foundStudent) {
        arr.push({ name: `${foundStudent.firstName} ${foundStudent.lastName}`, position: officer.position });
      }
    });
    // return list of students
    return arr;
  };

  // useMemo caches the expensive calculation
  const officersInClub = useMemo(() => getEmails(officers, students), [officers, students]);

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
              {officersInClub.map(officer => (
                <div key={`${officer.name}${officer.position}`}>
                  <div>
                    {officer.name}
                  </div>
                  <div>
                    {officer.position}
                  </div>
                </div>
              ))}
            </Row>
          </Col>
        </Row>
        <Row className="pt-2">
          <h3>ADVISOR</h3>
          <p>{club[0].advisor}</p>
        </Row>
        <Row className="pt-2">
          <h3>MEETING</h3>
          <p> {club[0].meetingDay} {club[0].meetingTime} {club[0].meetingLocation}</p>
        </Row>
        <Row className="pt-2">
          <h3>JOIN US</h3>
          <a href={club[0].joinLink}>{club[0].joinLink}</a>
        </Row>
        <Row>
          <EditClub id={_id} />
        </Row>
      </Col>
    </Container>
  ) : <LoadingSpinner message="Loading Club" />);
};

export default Club;
