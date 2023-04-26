import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';

export const staffProfilePublications = {
  staffProfile: 'staffProfile',
  staffProfileAdmin: 'staffProfileAdmin',
};

class StaffProfileCollection extends BaseProfileCollection {
  constructor() {
    super('StaffProfile', new SimpleSchema({
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
      image: {
        type: String,
        optional: true,
      },
      bio: {
        type: String,
        optional: true,
      },
      phoneNumber: {
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
   * @param image the image of the staff (optional).
   * @param bio the biography of the staff (optional).
   * @param phoneNumber the phone number of the staff
   */
  define({ email, firstName, lastName, password, role, image, bio, phoneNumber }) {
    if (Meteor.isServer) {
      const username = email;
      const user = this.findOne({ email, firstName, lastName });
      if (!user) {
        const userID = Users.define({ username, role, password });
        const profileID = this._collection.insert({ email, password, firstName, lastName, userID, role, image, bio, phoneNumber });
        this._collection.update(profileID, { $set: { userID } });
        return profileID;
      }
      return user._id;
    }
    return undefined;
  }

  /**
   * Updates the StudentProfile. You cannot change the email or role.
   * @param profileID the id of the StudentProfile
   * @param password
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   * @param image new image of staff (optional).
   * @param bio new biography of staff (optional).
   * @param phoneNumber new phonenumber of staff (optional).
   */
  update(profileID, { password, firstName, lastName, image, bio, phoneNumber }) {
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
    if (image) {
      updateData.image = image;
    }
    if (bio) {
      updateData.bio = bio;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    } else {
      updateData.phoneNumber = '';
    }
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

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.OFFICE || doc.role !== ROLE.TECH) {
        problems.push(`StaffProfile instance does not have ROLE.OFFICE or ROLE.TECH: ${doc}`);
      }
    });
    return problems;
  }

  publish() {
    if (Meteor.isServer) {
      // get the StaffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(staffProfilePublications.staffProfile, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(staffProfilePublications.staffProfileAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for staff owned by the current user.
   */
  subscribeStaffProfile() {
    if (Meteor.isClient) {
      return Meteor.subscribe(staffProfilePublications.staffProfile);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStaffProfileAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(staffProfilePublications.staffProfileAdmin);
    }
    return null;
  }

  /**
   * Returns an object representing the StudentProfile profileID in a format acceptable to define().
   * @param profileID The profileID of a StudentProfile
   * @returns {{firstName: *, lastName: *, image: *, password: *, phoneNumber: (*|number), bio: *, email: *}} An object representing the definition of docID.
   */
  dumpOne(profileID) {
    const doc = this.findDoc(profileID);
    const email = doc.email;
    const password = doc.password;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const image = doc.role;
    const bio = doc.bio;
    const phoneNumber = doc.roomNumber;
    return { email, password, firstName, lastName, image, bio, phoneNumber }; // CAM this is not enough for the define method. We lose the password.
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 * @type {StaffProfileCollection}
 */
export const StaffProfiles = new StaffProfileCollection();
