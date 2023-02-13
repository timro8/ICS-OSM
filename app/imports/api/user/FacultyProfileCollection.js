import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

export const FACULTY_ROLES = ['PROFESSOR', 'TA', 'RA', 'N/A'];

// export const roomNumbers = ['307A', '307B', '309', '310', '311', '312', '313', '314'];

export const facultyProfilePublications = {
  facultyProfile: 'facultyProfile',
  facultyProfileAdmin: 'facultyProfileAdmin',
};

class FacultyProfileCollection extends BaseProfileCollection {
  constructor() {
    super('FacultyProfile', new SimpleSchema({
      email: {
        type: String,
        optional: false,
      },
      password: {
        type: String,
        optional: false,
      },
      firstName: String,
      lastName: String,
      facRole: {
        type: String,
        allowedValues: FACULTY_ROLES,
        defaultValue: 'N/A',
      },
      image: {
        type: String,
        optional: true,
      },
      bio: {
        type: String,
        optional: true,
      },
      rooms: [String],
      // allowedValues: roomNumbers,
      // defaultValue: ['309', '307A'],
      phoneNumber: {
        type: String,
        optional: true,
      },
      officeHours: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   */
  define({ email, firstName, lastName, password, facRole, image, bio, rooms, phoneNumber, officeHours }) {
    if (Meteor.isServer) {
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.USER;
        const userID = Users.define({ username, role, password });
        const profileID = this._collection.insert({ email, password, firstName, lastName, userID, role, facRole, image, bio, rooms, phoneNumber, officeHours });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the StudentProfile. You cannot change the email or role.
   * @param docID the id of the StudentProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   */
  update(profileID, { password, firstName, lastName, facRole, image, bio, rooms, phoneNumber, officeHours }) {
    this.assertDefined(profileID);
    const updateData = {};
    if (password) {
      updateData.password = password;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (facRole) {
      updateData.facRole = facRole;
    }
    if (image) {
      updateData.image = image;
    }
    if (bio) {
      updateData.bio = bio;
    }
    if (rooms) {
      updateData.rooms = rooms;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (officeHours) {
      updateData.officeHours = officeHours;
    }
    this._collection.update(profileID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.FACULTY) {
        problems.push(`FacultyProfile instance does not have ROLE.FACULTY: ${doc}`);
      }
    });
    return problems;
  }

  publish() {
    if (Meteor.isServer) {
      // get the FacultyCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(facultyProfilePublications.facultyProfile, function publish() {
        if (this.userId) {
          return instance._collection.find(this.userId);
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(facultyProfilePublications.facultyProfileAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for faculty owned by the current user.
   */
  subscribeFacultyProfile() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyProfilePublications.facultyProfile);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeFacultyProfileAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyProfilePublications.facultyProfileAdmin);
    }
    return null;
  }

  /**
   * Returns an object representing the StudentProfile docID in a format acceptable to define().
   * @param docID The docID of a StudentProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(profileID) {
    const doc = this.findDoc(profileID);
    const email = doc.email;
    const password = doc.password;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const facRole = doc.facRole;
    const image = doc.role;
    const bio = doc.bio;
    const rooms = doc.rooms;
    const phoneNumber = doc.roomNumber;
    const officeHours = doc.officeHours;
    return { email, password, firstName, lastName, facRole, image, bio, rooms, phoneNumber, officeHours }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {FacultyProfileCollection}
 */
export const FacultyProfiles = new FacultyProfileCollection();
