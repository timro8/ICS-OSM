import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { Clubs } from '../../../api/club/Club';

// TODO: limit to a maximum of 3 items of each array and add show more to show full list
// TODO: add images to to items that has images
// TODO: make list items clickable
// TODO: show more info about the list items
// TODO: allow using keys to interact with the search bar

const FacultyListItem = ({ faculty }) => (
  <div className="search-list-item faculty-list-item">
    <Col md={1}>
      <img src={faculty.image} alt="faculty" />
    </Col>
    <Col md={11}>
      <div className="search-list-item-main">
        {faculty.firstName} {faculty.lastName}
      </div>
      <div className="search-list-item-extra">
        {faculty.email}
      </div>
    </Col>
  </div>
);

const HomeSearchBar = () => {

  const [searchInput, setSearchInput] = useState('');
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);

  const { faculties, students, clubs } = useTracker(() => {
    FacultyProfiles.subscribeFacultyProfileAdmin();
    StudentProfiles.subscribeStudentProfile();
    Clubs.subscribeClub();
    return {
      faculties: FacultyProfiles.find({}).fetch(),
      students: StudentProfiles.find({}).fetch(),
      clubs: Clubs.find({}).fetch(),
    };
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    const getFacultyInfo = (faculty) => `${faculty.firstName} ${faculty.lastName} ${faculty.email}`.toLowerCase();
    const getStudentInfo = (student) => `${student.firstName} ${student.lastName}`.toLowerCase();
    const getClubInfo = (club) => `${club.clubName}`.toLowerCase().toLowerCase();

    setFilteredFaculties(faculties.filter(faculty => getFacultyInfo(faculty).includes(searchInput.toLowerCase())));
    setFilteredStudents(students.filter(student => getStudentInfo(student).includes(searchInput.toLowerCase())));
    setFilteredClubs(clubs.filter(club => getClubInfo(club).includes(searchInput.toLowerCase())));
  };

  return (
    <Form className="search-container col-lg-6 p-0">
      <input type="search" onChange={handleInputChange} value={searchInput} placeholder="Search" className="search-input" />
      {searchInput.length > 0 && (
        <div className="search-body">
          {filteredFaculties.length > 0 && (
            <>
              <div className="search-heading">Faculties</div>
              {filteredFaculties.map(faculty => <FacultyListItem faculty={faculty} />)}
            </>
          )}
          {filteredStudents.length > 0 && (
            <>
              <div className="search-heading">Students</div>
              {filteredStudents.map(student => <div className="search-list-item">{student.firstName} {student.lastName}</div>)}
            </>
          )}
          {filteredClubs.length > 0 && (
            <>
              <div className="search-heading">Clubs</div>
              {filteredClubs.map(club => <div className="search-list-item">{club.clubName}</div>)}
            </>
          )}
        </div>
      )}
    </Form>
  );
};

FacultyListItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default HomeSearchBar;
