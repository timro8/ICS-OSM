import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ArrowDown, ArrowReturnLeft, ArrowUp } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { FacultyProfiles } from '../../../api/user/FacultyProfileCollection';
import { Clubs } from '../../../api/club/Club';
import { Rooms } from '../../../api/room/RoomCollection';
import FacultyListItem from './list-item/FacultyListItem';
import ClubListItem from './list-item/ClubListItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import RoomListItem from './list-item/RoomListItem';

// TODO: move search to nav
// TODO: don't show search body if search results is empty
// TODO: remove Link text decoration

const HomeSearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const { faculties, clubs, rooms, ready } = useTracker(() => {
    const facultySubscription = FacultyProfiles.subscribeFacultyProfileAdmin();
    const clubSubscription = Clubs.subscribeClub();
    const roomsSubscription = Rooms.subscribeRoom();

    const allSubcriptionsReady = facultySubscription.ready() && clubSubscription.ready() && roomsSubscription.ready();

    return {
      faculties: FacultyProfiles.find({}).fetch(),
      clubs: Clubs.find({}).fetch(),
      rooms: Rooms.find({}).fetch(),
      ready: allSubcriptionsReady,
    };
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

    const getFacultyInfo = (faculty) => `${faculty.firstName} ${faculty.lastName} ${faculty.email}`.toLowerCase();
    const getClubInfo = (club) => `${club.clubName}`.toLowerCase();
    const getRoomInfo = (room) => `${room.location} ${room.roomNumber}`.toLowerCase();

    const facultiesSearchResult = faculties.filter(faculty => getFacultyInfo(faculty).includes(searchInput.toLowerCase())).slice(0, 3);
    const clubsSearchResult = clubs.filter(club => getClubInfo(club).includes(searchInput.toLowerCase())).slice(0, 3);
    const roomsSearchResult = rooms.filter(room => getRoomInfo(room).match(searchInput.toLowerCase())).slice(0, 3);

    setFilteredItems([...facultiesSearchResult, ...clubsSearchResult, ...roomsSearchResult]);
    setFilteredFaculties(facultiesSearchResult);
    setFilteredClubs(clubsSearchResult);
    setFilteredRooms(roomsSearchResult);

    setSelectedItemIndex(0); // Reset active item index on input change
  };

  const handleKeyDown = (e) => {
    const searchResultsLength = (filteredFaculties.length + filteredClubs.length + filteredRooms.length) - 1;
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
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const isFacultyItem = selectedItemIndex <= filteredFaculties.length - 1;
      const isClubItem = selectedItemIndex <= (filteredFaculties.length - 1) + (filteredClubs.length - 1);

      if (isFacultyItem) {
        window.location.href = `/profile/${filteredItems[selectedItemIndex]._id}`;
      } else if (isClubItem) {
        window.location.href = `/clubs/${filteredItems[selectedItemIndex]._id}`;
      } else {
        window.location.replace(`/roomdetails/${filteredItems[selectedItemIndex]._id}`);
      }
    }
  };

  return ready ? (
    <Form className="search-container col-lg-6 p-0">
      <input type="search" onChange={handleInputChange} onKeyDown={handleKeyDown} value={searchInput} placeholder="Search" className="search-input" />
      {searchInput.length > 0 && (
        <div className="search-body">
          <div className="search-results">
            {filteredFaculties.length > 0 && (
              <>
                <div className="search-heading">Faculties</div>
                {filteredFaculties.map((faculty, index) => <Link to={`/profile/${faculty._id}`}><FacultyListItem faculty={faculty} selectedItemIndex={selectedItemIndex} index={index} /></Link>)}
              </>
            )}
            {filteredClubs.length > 0 && (
              <>
                <div className="search-heading">Clubs</div>
                {filteredClubs.map((club, index) => <Link to={`/clubs/${club._id}`}><ClubListItem club={club} index={index + (filteredFaculties.length)} selectedItemIndex={selectedItemIndex} /></Link>)}
              </>
            )}
            {filteredRooms.length > 0 && (
              <>
                <div className="search-heading">Rooms</div>
                {filteredRooms.map((room, index) => <Link to={`/roomdetails/${room._id}`}><RoomListItem index={index + filteredClubs.length + filteredFaculties.length} room={room} selectedItemIndex={selectedItemIndex} /></Link>) }
              </>
            )}
          </div>
          <div className="key-use-info">
            <div className="key-section">
              <div className="move-keys">
                <ArrowUp className="key-icon" />
                <ArrowDown className="key-icon" />
              </div>
              <span className="key-text">Move</span>
            </div>
            <div className="key-section">
              <ArrowReturnLeft className="key-icon" />
              <span className="key-text">Select</span>
            </div>
          </div>
        </div>
      )}
    </Form>
  ) : <LoadingSpinner />;
};

export default HomeSearchBar;
