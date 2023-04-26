import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FacultyProfiles } from '../imports/api/user/FacultyProfileCollection';

Meteor.methods({
  deleteFacultyUser(id) {
    // Check the parameter datatype
    check(id, String);
    this.unblock();
    const userId = FacultyProfiles.findOne({ _id: id }, {});
    Meteor.users.remove(userId.userID);
  },
});
