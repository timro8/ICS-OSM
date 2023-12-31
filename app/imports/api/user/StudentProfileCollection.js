import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

export const studentProfilePublications = {
  studentProfile: 'studentProfile',
  studentProfileAdmin: 'studentProfileAdmin',
};
class StudentProfileCollection extends BaseProfileCollection {
  constructor() {
    super('StudentProfile', new SimpleSchema({
      email: {
        type: String,
        optional: false,
      },
      password: {
        type: String,
        optional: true,
      },
      firstName: String,
      lastName: String,
    }));
  }

  /**
   * Defines the profile associated with an User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   */
  define({ email, firstName, lastName, password }) {
    if (Meteor.isServer) {
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const role = ROLE.STUDENT;
        const userID = Users.define({ username, role, password });
        const profileID = this._collection.insert({ email, firstName, lastName, userID, role });
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
  update(profileID, { firstName, lastName }) {
    this.assertDefined(profileID);
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    this._collection.update(profileID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    const doc = this.findDoc(profileID);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
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

  publish() {
    if (Meteor.isServer) {
      // get the StudentCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(studentProfilePublications.studentProfile, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(studentProfilePublications.studentProfileAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for student owned by the current user.
   */
  subscribeStudentProfile() {
    if (Meteor.isClient) {
      return Meteor.subscribe(studentProfilePublications.studentProfile);
    }
    return null;
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
      if (doc.role !== ROLE.User) {
        problems.push(`StudentProfile instance does not have ROLE.Student: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Returns an object representing the StudentProfile docID in a format acceptable to define().
   * @param docID The docID of a StudentProfile
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    return { email, firstName, lastName }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {StudentProfileCollection}
 */
export const StudentProfiles = new StudentProfileCollection();
