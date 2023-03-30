import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Rooms } from '../../api/room/RoomCollection';
import { Events302 } from '../../api/events/Events302Collection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OccupantRoom } from '../../api/user/OccupantRoomCollection';
import { Discussions } from '../../api/discussion/Discussion';
import { Clubs } from '../../api/club/Club';
import { ClubOfficers } from '../../api/clubofficers/ClubOfficersCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { TechProfiles } from '../../api/user/TechProfileCollection';
import { RoomJacks } from '../../api/room/RoomJacks';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

function addRoomData(data) {
  console.log(`  Adding: ${data.roomNumber}`);
  Rooms.define(data);
}

function addFacultyData(data) {
  console.log(`  Adding: ${data.lastName} (${data.email})`);
  FacultyProfiles.define(data);
}

function addEvents302Data(data) {
  console.log(`Adding event created by: ${data.owner}`);
  Events302.define(data);
}

function addOccupantRoomData(data) {
  console.log(`Adding occupant room: ${data.email} (${data.roomKey})`);
  OccupantRoom.define(data);
}

function addDiscussionsData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Discussions.define(data);
}

function addClubData(data) {
  console.log(`  Adding: ${data.clubName} `);
  Clubs.define(data);
}

function addClubOfficersData(data) {
  console.log(`  Adding: ${data.studentId} from ${data.clubId}`);
  ClubOfficers.define(data);
}

function addOfficeData(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName}`);
  OfficeProfiles.define(data);
}

function addTechData(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName}`);
  TechProfiles.define(data);
}

function addRoomJackData(data) {
  console.log(`  Adding: ${data.jackNumber}`);
  RoomJacks.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the RoomsCollection if empty.
if (Rooms.count() === 0) {
  if (Meteor.settings.defaultRoomData) {
    console.log('Creating default room data.');
    Meteor.settings.defaultRoomData.map(data => addRoomData(data));
  }
}

if (FacultyProfiles.count() === 0) {
  if (Meteor.settings.defaultFacultyProfileData) {
    console.log('Creating default faculty data.');
    Meteor.settings.defaultFacultyProfileData.map(data => addFacultyData(data));
  }
}
// Meteor.settings.defaultFacultyProfileData.map(data => addFacultyData(data));
if (Events302.count() === 0) {
  if (Meteor.settings.defaultEvents302Data) {
    console.log('Creating default event data for room 302.');
    Meteor.settings.defaultEvents302Data.map(data => addEvents302Data(data));
  }
}

if (OfficeProfiles.count() === 1) {
  if (Meteor.settings.defaultOfficeData) {
    console.log('Creating default office data.');
    Meteor.settings.defaultOfficeData.map(data => addOfficeData(data));
  }
}

if (TechProfiles.count() === 1) {
  if (Meteor.settings.defaultTechData) {
    console.log('Creating default tech data.');
    Meteor.settings.defaultTechData.map(data => addTechData(data));
  }
}

if (OccupantRoom.count() === 0) {
  if (Meteor.settings.defaultOccupantRoomData) {
    console.log('Creating default occupant room data.');
    Meteor.settings.defaultOccupantRoomData.map(data => addOccupantRoomData(data));
  }
}

if (Discussions.count() === 0) {
  if (Meteor.settings.defaultDiscussion) {
    console.log('Creating default faculty room data.');
    Meteor.settings.defaultDiscussion.map(data => addDiscussionsData(data));
  }
}

if (Clubs.count() === 0) {
  if (Meteor.settings.defaultClubsData) {
    console.log('Creating default clubs data.');
    Meteor.settings.defaultClubsData.map(data => addClubData(data));
  }
}

if (ClubOfficers.count() === 0) {
  if (Meteor.settings.defaultClubOfficers) {
    console.log('Creating default club officer data.');
    Meteor.settings.defaultClubOfficers.map(data => addClubOfficersData(data));
  }
}

if (RoomJacks.count() === 0) {
  if (Meteor.settings.defaultJackData) {
    console.log('Creating default room jack data.');
    Meteor.settings.defaultJackData.map(data => addRoomJackData(data));
  }
}
