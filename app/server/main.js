import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Faculties } from '../imports/api/faculty/FacultyCollection';

Meteor.methods({
  insertFaculty(data) {
    // Make sure that all argument is object.
    check(data, Object);
    this.unblock();
    Faculties.define(data);
  },
});
