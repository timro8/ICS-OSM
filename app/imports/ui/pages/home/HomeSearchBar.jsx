import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { Clubs } from '../../../api/club/Club';

// TODO: add filter buttons on the search body
// TODO: limit to a maximum of 3 items of each array
// TODO: add images to to items that has images
// TODO: make list items clickable
// TODO: show more info about the list items

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
    setFilteredFaculties(faculties.filter(faculty => `${faculty.firstName} ${faculty.lastName}`.toLowerCase().includes(searchInput.toLowerCase())));
    setFilteredStudents(students.filter(student => `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchInput.toLowerCase())));
    setFilteredClubs(clubs.filter(club => `${club.clubName}`.toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (
    <Form className="search-container col-lg-6">
      <input type="search" onChange={handleInputChange} value={searchInput} placeholder="Search" className="search-input" />
      {searchInput.length > 0 && (
        <div className="search-body">
          {filteredFaculties.length > 0 && (
            <>
              <div className="search-heading"><strong>Faculties</strong></div>
              {filteredFaculties.map(faculty => <p>{faculty.firstName} {faculty.lastName}</p>)}
            </>
          )}
          {filteredStudents.length > 0 && (
            <>
              <div className="search-heading"><strong>Students</strong></div>
              {filteredStudents.map(student => <p>{student.firstName} {student.lastName}</p>)}
            </>
          )}
          {filteredClubs.length > 0 && (
            <>
              <div className="search-heading"><strong>Clubs</strong></div>
              {filteredClubs.map(club => <p>{club.clubName}</p>)}
            </>
          )}
        </div>
      )}
    </Form>
  );

};

export default HomeSearchBar;
