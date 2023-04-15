// TODO: create a search bar that searches through Rooms, Faculties, Students, and Reservations.
// Make it dynamic: on input change update the results.
//
// Do faculties first
// ex: faculties: [{firstName: 'Cam', lastName: 'Moore'}, {firstName: 'Peter', lastName: 'Sadowski'}, ...]

import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';

const HomeSearchBar = () => {

  const [searchInput, setSearchInput] = useState('');
  const [filteredFaculties, setFilteredFaculties] = useState([]);

  // TODO: check readiness
  const { faculties } = useTracker(() => {
    FacultyProfiles.subscribeFacultyProfileAdmin();
    return {
      faculties: FacultyProfiles.find({}).fetch(),
    };
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setFilteredFaculties(faculties.filter(faculty => `${faculty.firstName} ${faculty.lastName}`.toLowerCase().includes(searchInput.toLowerCase())));
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
        </div>
      )}
    </>
  );

};

export default HomeSearchBar;
