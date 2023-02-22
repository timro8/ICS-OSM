import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FacultyProfiles } from '../imports/api/user/FacultyProfileCollection';

Meteor.methods({
  insertFaculty(data, rooms, officeHours, imageUpload) {
    // Check the parameter datatype
    check(data, Object);
    check(rooms, Array);
    check(officeHours, Array);
    check(imageUpload, String);
    this.unblock();
    const { firstName, lastName, email, password, bio, phoneNumber, role } = data;
    let userImg = imageUpload;
    if (userImg === undefined) {
      userImg = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
    }
    const facultyDefinitionData = { image: userImg, firstName, lastName, email, rooms: rooms, bio, phoneNumber, officeHours: officeHours.toString(), owner: Meteor.user().emails[0].address, role, password: password };
    FacultyProfiles.define(facultyDefinitionData);
  },
});
