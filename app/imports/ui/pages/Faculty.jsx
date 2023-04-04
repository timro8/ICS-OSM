import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import AddFacultyForm from '../components/Addpages/AddFacultyForm';
import SearchBar from '../components/SearchBar';
import FacultyCard from '../components/Facultypage/FacultyCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ROLE } from '../../api/role/Role';

const Faculty = () => {
  // show pop up to add faculty
  const [show, setShow] = useState(false);
  const [facultyList, setList] = useState([]);
  const { ready, faculties } = useTracker(() => {
    const subscription = FacultyProfiles.subscribeFacultyProfile();
    const rdy = subscription.ready();
    const facultyItems = FacultyProfiles.find({}, { sort: { lastName: 1 } }).fetch();
    setList(facultyItems);
    return {
      faculties: facultyItems,
      ready: rdy,
    };
  }, []);

  document.title = 'Faculty';
  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(faculties.filter(faculty => (`${faculty.firstName} + ' ' + ${faculty.lastName} + ' ' + ${faculty.room}`).toLowerCase().includes(searchInput.toLowerCase())));
  };
  return (ready ? (
    <Container className="py-3">
      <Container id={PAGE_IDS.FACULTY}>
        { /* Search Bar */ }
        <SearchBar handleSearch={handleSearch} />

        { /* Add Faculty button */ }
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
          [<Button key={Math.random()} style={{ marginLeft: '1vw', marginBottom: '20px' }} variant="primary" onClick={() => setShow(true)}>Add Faculty </Button>]
        ) : ''}

        { /* pop up for add faculty */ }
        <AddFacultyForm show={show} onClose={() => setShow(false)} key={Math.random()} />

        { /* show all the faculty card */ }
        <Row xs="1" md="2" xl="4">
          {facultyList.map((faculty) => <FacultyCard key={faculty._id} faculty={faculty} />)}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner message="Loading Faculties" />);
};

export default Faculty;
