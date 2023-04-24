import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { StaffProfiles } from '../imports/api/user/StaffProfileCollection';

Meteor.methods({
  deleteStaffUser(id) {
    // Check the parameter datatype
    check(id, String);
    this.unblock();
    const userId = StaffProfiles.findOne({ _id: id }, {});
    Meteor.users.remove(userId.userID);
  },
});
