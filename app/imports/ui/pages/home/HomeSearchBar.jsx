// TODO: create a search bar that searches through Rooms, Faculties, Students, and Reservations.
// Make it dynamic: on input change update the results.
//
// Do faculties first
// ex: faculties: [{firstName: 'Cam', lastName: 'Moore'}, {firstName: 'Peter', lastName: 'Sadowski'}, ...]

import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';

const HomeSearchBar = () => {

  const [searchInput, setSearchInput] = useState('');
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // TODO: check readiness
  const { faculties, students } = useTracker(() => {
    FacultyProfiles.subscribeFacultyProfileAdmin();
    StudentProfiles.subscribeStudentProfile();
    return {
      faculties: FacultyProfiles.find({}).fetch(),
      students: StudentProfiles.find({}).fetch(),
    };
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setFilteredFaculties(faculties.filter(faculty => `${faculty.firstName} ${faculty.lastName}`.toLowerCase().includes(searchInput.toLowerCase())));
    setFilteredStudents(students.filter(student => `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchInput.toLowerCase())));
  };

  return (
    <>
      <input type="search-input" onChange={handleInputChange} value={searchInput} />
      {searchInput.length > 0 && (
        <div className="search-body">
          {filteredFaculties.length > 0 && (
            <>
              <p className="search-heading"><strong>Faculties</strong></p>
              {filteredFaculties.map(faculty => <p>{faculty.firstName} {faculty.lastName}</p>)}
            </>
          )}
          {filteredStudents.length > 0 && (
            <>
              <p className="search-heading"><strong>Students</strong></p>
              {filteredStudents.map(student => <p>{student.firstName} {student.lastName}</p>)}
            </>
          )}
        </div>
      )}
    </>
  );

};

export default HomeSearchBar;
