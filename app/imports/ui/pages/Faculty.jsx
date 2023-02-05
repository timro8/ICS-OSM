import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import AddFacultyForm from '../components/AddFacultyForm';
import SearchBar from '../components/SearchBar';
import FacultyCard from '../components/FacultyCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Faculties } from '../../api/faculty/FacultyCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const Faculty = () => {
  // show pop up to add faculty
  const [show, setShow] = useState(false);
  const [facultyList, setList] = useState([]);
  const { ready, faculties } = useTracker(() => {
    const subscription = Faculties.subscribeFacultyAdmin();
    const rdy = subscription.ready();
    const facultyItems = Faculties.find({}, { sort: { lastName: 1 } }).fetch();
    setList(facultyItems);
    return {
      faculties: facultyItems,
      ready: rdy,
    };
  }, []);
  const handleSearch = (search) => {
    const searchInput = search.trim();
    setList(faculties.filter(faculty => (faculty.firstName + faculty.lastName + faculty.room).toLowerCase().includes(searchInput.toLowerCase())));
  };
  return (ready ? (
    <Container className="py-3">
      <Container id={PAGE_IDS.FACULTY}>
        { /* Search Bar */ }
        <SearchBar handleSearch={handleSearch} />

        { /* Add Faculty button */ }
        <Button
          style={{ marginLeft: '1vw', marginBottom: '20px' }}
          variant="primary"
          onClick={() => setShow(true)}
        >Add Faculty
        </Button>

        { /* pop up for add faculty */ }
        <AddFacultyForm show={show} onClose={() => setShow(false)} />

        { /* show all the faculty card */ }
        <Row xs="1" md="2" xl="4">
          {facultyList.map((faculty) => <FacultyCard key={faculty._id} faculty={faculty} />)}
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner message="Loading Faculties" />);
};

export default Faculty;
