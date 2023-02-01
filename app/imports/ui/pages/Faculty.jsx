import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import AddFacultyForm from '../components/AddFacultyForm';
import SearchBar from '../components/SearchBar';
import FacultyCard from '../components/FacultyCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import { FacultyProfiles } from '../../api/faculty/FacultyCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const Faculty = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { faculties, ready } = useTracker(() => {
    // Get access to Room documents.
    const subscription = FacultyProfiles.subscribeFaculty();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const items = FacultyProfiles.find({}).fetch();
    console.log(items);
    return {
      faculties: items,
      ready: rdy,
    };
  }, []);

  // show pop up to add faculty
  const [show, setShow] = useState(false);

  return ready ? (
    <Container className="py-3">
      <Container id={PAGE_IDS.FACULTY}>
        { /* Search Bar */ }
        <SearchBar />

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
          {faculties.map((faculty, i) => <FacultyCard key={i} room={faculty.room} name={`${faculty.firstName} ${faculty.lastName}`} />)}
          <FacultyCard room={307} name="Cam Moore" />
        </Row>
      </Container>
    </Container>
  ) : <LoadingSpinner />;
};

export default Faculty;
