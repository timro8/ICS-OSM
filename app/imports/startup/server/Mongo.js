import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Rooms } from '../../api/room/RoomCollection';
import { Events302 } from '../../api/events/Events302Collection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

function addRoomData(data) {
  console.log(`  Adding: ${data.roomNumber} (${data.owner})`);
  Rooms.define(data);
}

function addFacultyData(data) {
  console.log(`  Adding: ${data.lastName} (${data.username})`);
  FacultyProfiles.define(data);
}

function addEvents302Data(data) {
  console.log(`Adding event created by: ${data.owner}`);
  Events302.define(data);
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

if (Events302.count() === 0) {
  if (Meteor.settings.defaultEvents302Data) {
    console.log('Creating default event data for room 302.');
    Meteor.settings.defaultEvents302Data.map(data => addEvents302Data(data));
  }
}
