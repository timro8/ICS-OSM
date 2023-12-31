import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Plus } from 'react-bootstrap-icons';
import AddFacultyForm from '../components/Addpages/AddFacultyForm';
import SearchBar from '../components/SearchBar';
import FacultyCard from '../components/Facultypage/FacultyCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ROLE } from '../../api/role/Role';
import DownloadCSVButton from '../components/DownloadCSVButton';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import CircleButton from '../components/CircleButton';

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
    setList(faculties.filter(faculty => (`${faculty.firstName} + ' ' + ${faculty.lastName} + ' ' + ${faculty.rooms.join(', ')}`).toLowerCase().includes(searchInput.toLowerCase())));
  };
  return (ready ? (
    <Container className="py-3">
      <Container id={PAGE_IDS.FACULTY}>
        { /* Search Bar */ }
        <SearchBar handleSearch={handleSearch} />

        { /* Add Faculty button */ }
        {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.OFFICE]) ? (
          <div className="py-3 d-flex gap-2">
            <CircleButton tooltip="Add Faculty" id={`${COMPONENT_IDS.ADD_FACULTY}`} onClick={() => setShow(true)} key="add-faculty" variant="dark">
              <Plus fontSize="25px" />
            </CircleButton>
            <DownloadCSVButton collection={FacultyProfiles} />
          </div>
        ) : ''}

        { /* pop up for add faculty */ }
        <AddFacultyForm show={show} onClose={() => setShow(false)} key={Math.random()} />

        { /* show all the faculty card */ }
        <Row xs="1" md="2" xl="3">
          {facultyList.map((faculty) => <FacultyCard key={faculty._id} faculty={faculty} />)}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner message="Loading Faculties" />);
};

export default Faculty;
