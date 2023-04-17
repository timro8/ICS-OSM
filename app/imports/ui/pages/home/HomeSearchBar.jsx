import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../../api/user/StudentProfileCollection';
import { Clubs } from '../../../api/club/Club';
import { Rooms } from '../../../api/room/RoomCollection';
import FacultyListItem from './list-item/FacultyListItem';
import StudentListItem from './list-item/StudentListItem';
import ClubListItem from './list-item/ClubListItem';
import LoadingSpinner from '../../components/LoadingSpinner';

// TODO: add icons to search
// TODO: move search to nav
// TODO: add rooms to search
// TODO: limit to a maximum of 5 items of each array and add show more to show full list
// TODO: make list items clickable
// TODO: allow using keys to interact with the search bar

const HomeSearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { faculties, students, clubs, rooms, ready } = useTracker(() => {
    const facultySubscription = FacultyProfiles.subscribeFacultyProfileAdmin();
    const studentSubscription = StudentProfiles.subscribeStudentProfile();
    const clubSubscription = Clubs.subscribeClub();
    const roomsSubscription = Rooms.subscribeRoom();

    const allSubcriptionsReady = facultySubscription.ready() && studentSubscription.ready() && clubSubscription.ready() && roomsSubscription.ready();

    return {
      faculties: FacultyProfiles.find({}).fetch(),
      students: StudentProfiles.find({}).fetch(),
      clubs: Clubs.find({}).fetch(),
      rooms: Rooms.find({}).fetch(),
      ready: allSubcriptionsReady,
    };
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    const getFacultyInfo = (faculty) => `${faculty.firstName} ${faculty.lastName} ${faculty.email}`.toLowerCase();
    const getStudentInfo = (student) => `${student.firstName} ${student.lastName}`.toLowerCase();
    const getClubInfo = (club) => `${club.clubName}`.toLowerCase();
    const getRoomInfo = (room) => `${room.location} ${room.roomNumber}`.toLowerCase();

    setFilteredFaculties(faculties.filter(faculty => getFacultyInfo(faculty).includes(searchInput.toLowerCase())));
    setFilteredStudents(students.filter(student => getStudentInfo(student).includes(searchInput.toLowerCase())));
    setFilteredClubs(clubs.filter(club => getClubInfo(club).includes(searchInput.toLowerCase())));
    setFilteredRooms(rooms.filter(room => getRoomInfo(room).match(searchInput.toLowerCase())));

    setSelectedItemIndex(0); // Reset active item index on input change
  };

  const handleKeyDown = (e) => {
    const searchResultsLength = (filteredFaculties.length + filteredClubs.length + filteredStudents.length) - 1;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedItemIndex === 0) {
        setSelectedItemIndex(searchResultsLength);
      } else {
        setSelectedItemIndex(Math.max(selectedItemIndex - 1, 0));
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedItemIndex === searchResultsLength) {
        setSelectedItemIndex(0);
      } else {
        setSelectedItemIndex(Math.min(selectedItemIndex + 1, searchResultsLength));
      }
    }
  };

  return ready ? (
    <Form className="search-container col-lg-6 p-0">
      <input type="search" onChange={handleInputChange} onKeyDown={handleKeyDown} value={searchInput} placeholder="Search" className="search-input" />
      {searchInput.length > 0 && (
        <div className="search-body">
          {filteredFaculties.length > 0 && (
            <>
              <div className="search-heading">Faculties</div>
              {filteredFaculties.map((faculty, index) => <FacultyListItem faculty={faculty} selectedItemIndex={selectedItemIndex} index={index} />)}
            </>
          )}
          {filteredStudents.length > 0 && (
            <>
              <div className="search-heading">Students</div>
              {filteredStudents.map((student, index) => <StudentListItem student={student} selectedItemIndex={selectedItemIndex} index={index + (filteredFaculties.length)} />)}
            </>
          )}
          {filteredClubs.length > 0 && (
            <>
              <div className="search-heading">Clubs</div>
              {filteredClubs.map((club, index) => <ClubListItem club={club} index={index + (filteredFaculties.length + filteredStudents.length)} selectedItemIndex={selectedItemIndex} />)}
            </>
          )}
          {filteredRooms.length > 0 && (
            <>
              <div className="search-heading">Rooms</div>
              {filteredRooms.map((room) => <div>{room.location} {room.roomNumber}</div>)}
            </>
          )}
        </div>
      )}
    </Form>
  ) : <LoadingSpinner />;
};

export default HomeSearchBar;
