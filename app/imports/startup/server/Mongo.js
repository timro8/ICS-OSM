import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Rooms } from '../../api/room/RoomCollection';
import { Faculties } from '../../api/faculty/FacultyCollection';
import { Events302 } from '../../api/events/Events302Collection';
import { FacultyRoom } from '../../api/faculty/FacultyRoomCollection';
import { Discussions } from '../../api/discussion/Discussion';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

function addRoomData(data) {
  console.log(`  Adding: ${data.roomNumber} (${data.occupants})`);
  Rooms.define(data);
}

function addFacultyData(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Faculties.define(data);
}

function addEvents302Data(data) {
  console.log(`Adding event created by: ${data.owner}`);
  Events302.define(data);
}

function addFacultyRoomData(data) {
  console.log(`Adding faculty room: ${data.email} (${data.roomKey})`);
  FacultyRoom.define(data);
}

function addDiscussionsData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Discussions.define(data);
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

// Initialize the RoomsCollection if empty.
if (Faculties.count() === 0) {
  if (Meteor.settings.defaultFacultyData) {
    console.log('Creating default faculty data.');
    Meteor.settings.defaultFacultyData.map(data => addFacultyData(data));
  }
}

if (Events302.count() === 0) {
  if (Meteor.settings.defaultEvents302Data) {
    console.log('Creating default event data for room 302.');
    Meteor.settings.defaultEvents302Data.map(data => addEvents302Data(data));
  }
}

if (FacultyRoom.count() === 0) {
  if (Meteor.settings.defaultFacultyRoomData) {
    console.log('Creating default faculty room data.');
    Meteor.settings.defaultFacultyRoomData.map(data => addFacultyRoomData(data));
  }
}

if (Discussions.count() === 0) {
  if (Meteor.settings.defaultDiscussion) {
    console.log('Creating default faculty room data.');
    Meteor.settings.defaultDiscussion.map(data => addDiscussionsData(data));
  }
}
