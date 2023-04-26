import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { StaffProfiles } from '../../api/user/StaffProfileCollection';

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, password, isClubPresident, clubPosition, image, bio, phoneNumber) {
  if (role === ROLE.ADMIN) AdminProfiles.define({ email, firstName, lastName, password });
  if (role === ROLE.FACULTY) UserProfiles.define({ email, firstName, lastName, password });
  if (role === ROLE.OFFICE) {
    StaffProfiles.define({ email, firstName, lastName, password, role, image, bio, phoneNumber });
  }
  if (role === ROLE.STUDENT) StudentProfiles.define({ email, firstName, lastName, password, isClubPresident, clubPosition });
  if (role === ROLE.TECH) {
    StaffProfiles.define({ email, firstName, lastName, password, role, image, bio, phoneNumber });
  }
  if (role === ROLE.USER) UserProfiles.define({ email, firstName, lastName, password });
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstName, lastName, isClubPresident, clubPosition }) => (
      createUser(email, role, firstName, lastName, password, isClubPresident, clubPosition)
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
