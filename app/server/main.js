import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../imports/api/user/FacultyProfileCollection';
import { Rooms } from '../imports/api/room/RoomCollection';

Meteor.methods({
  insertFaculty(data, rooms, officeHours) {
    // Make sure that all argument is object.
    check(data, Object);
    check(rooms, Array);
    check(officeHours, Array);
    this.unblock();
    const { image, firstName, lastName, email, password, bio, phoneNumber, role } = data;
    let userImg = image;
    if (userImg === undefined) {
      userImg = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    }
    const facultyDefinitionData = { image: userImg, firstName, lastName, email, rooms: rooms, bio, phoneNumber, officeHours: officeHours.toString(), owner: Meteor.user().emails[0].address, role, password: password };
    FacultyProfiles.define(facultyDefinitionData);

    for (let i = 0; i < rooms.length; i++) {
      const { room } = useTracker(() => {
        // Get access to Room documents.
        Rooms.subscribeRoomAdmin();
        // Get the Room documents
        const items = Rooms.find({ roomNumber: rooms[i] }).fetch();
        return {
          room: items,
        };
      }, []);
      if (!room[0].occupants.includes(email)) {
        room[0].occupants.push(email);
        Rooms.update(room[0]._id, room[0]);
      }
    }
  },
});
