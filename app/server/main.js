import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Faculties } from '../imports/api/faculty/FacultyCollection';
import { UserProfiles } from '../imports/api/user/UserProfileCollection';

Meteor.methods({
  insertFaculty(data, data2) {
    // Make sure that all argument is object.
    check(data, Object);
    check(data2, Object);
    this.unblock();
    Faculties.define(data);
    UserProfiles.define(data2);
  },
});
