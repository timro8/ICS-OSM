import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { FacultyProfiles } from '../imports/api/user/FacultyProfileCollection';
import { OccupantRoom } from '../imports/api/user/OccupantRoomCollection';
import { Rooms } from '../imports/api/room/RoomCollection';

Meteor.methods({
  insertFaculty(data, rooms, officeHours, phoneNumber, imageUpload) {
    // Check the parameter datatype
    check(data, Object);
    check(rooms, Array);
    check(officeHours, Array);
    check(phoneNumber, Array);
    check(imageUpload, String);
    this.unblock();
    const { firstName, lastName, email, password, bio, role } = data;
    let userImg = imageUpload;
    if (userImg === undefined) {
      userImg = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    }
    const facultyDefinitionData = { image: userImg, firstName, lastName, email, rooms: rooms, bio, phoneNumber: phoneNumber.toString(), officeHours: officeHours.toString(), owner: Meteor.user().emails[0].address, facRole: role, password: password };
    FacultyProfiles.define(facultyDefinitionData);
    if (rooms.length > 0 && !rooms.includes('n/a')) {
      // rooms.map((room) => OccupantRoom.define({ email: email, roomNumber: room }));
      rooms.map((room) => {
        const roomKey = _.pluck(Rooms.find({ roomNumber: room }).fetch(), 'roomKey');
        const occupantRoomDefinitionData = { email: email, roomKey: roomKey[0] };
        OccupantRoom.define(occupantRoomDefinitionData);
        return 1;
      });

    }
  },
});
