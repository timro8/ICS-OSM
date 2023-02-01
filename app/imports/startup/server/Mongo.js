import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Rooms } from '../../api/room/RoomCollection';
import { FacultyProfiles } from '../../api/faculty/FacultyCollection';
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
  console.log(`  Adding: ${data.lastName}`);
  FacultyProfiles.define(data);
  console.log(data);
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

// Initialize the FacultyCollection if empty.
if (FacultyProfiles.count() === 0) {
  if (Meteor.settings.defaultFacultyData) {
    console.log('Creating default faculty data.');
    Meteor.settings.defaultFacultyData.map(data => addFacultyData(data));
  }
}
