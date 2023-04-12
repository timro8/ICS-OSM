import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../imports/api/role/Role';
import { FacultyProfiles } from '../imports/api/user/FacultyProfileCollection';
import { OfficeProfiles } from '../imports/api/user/OfficeProfileCollection';
import { TechProfiles } from '../imports/api/user/TechProfileCollection';
import { UserProfiles } from '../imports/api/user/UserProfileCollection';
import { StudentProfiles } from '../imports/api/user/StudentProfileCollection';

Meteor.methods({
  findFirstName() {
    // ROLE.OFFICE, ROLE.TECH, ROLE.FACULTY, ROLE.USER
    // StudentProfileCollection, OfficeProfileCollection, TechProfileCollection, FacultyProfileCollection, UserProfiles

    let name = '';
    if (Roles.userIsInRole(Meteor.userId(), ROLE.FACULTY)) {
      name = FacultyProfiles.findOne({ email: Meteor.user().username }, {});
      name = name.firstName;
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.OFFICE)) {
      name = OfficeProfiles.findOne({ email: Meteor.user().username }, {});
      name = name.firstName;
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.TECH)) {
      name = TechProfiles.findOne({ email: Meteor.user().username }, {});
      name = name.firstName;
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.USER)) {
      name = UserProfiles.findOne({ email: Meteor.user().username }, {});
      name = name.firstName;
    } else if (Roles.userIsInRole(Meteor.userId(), ROLE.STUDENT)) {
      name = StudentProfiles.findOne({ email: Meteor.user().username }, {});
      name = name.firstName;
    }
    return name;
  },
});
