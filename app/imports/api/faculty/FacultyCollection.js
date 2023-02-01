import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const facultyPublications = {
  faculty: 'faculty',
  facultyAdmin: 'FacultyAdmin',
};

class FacultyCollection extends BaseCollection {
  constructor() {
    super('Faculty', new SimpleSchema({
      image: String,
      firstName: String,
      lastName: String,
      owner: String,
      bio: String,
      room: String,
      phoneNumber: String,
      officeHours: String,
    }));
  }

  /**
   * Defines a new Faculty item.
   * @param image the picture of user.
   * @param firstName the first name of the user.
   * @param lastName the last name of the user.
   * @param owner the owner of the user.
   * @param bio the description of the user.
   * @param room the room location of the user.
   * @param phoneNumber the phone number of the user.
   * @param officeHours the office hour of the user.
   * @return {String} the docID of the new document.
   */
  define({ image, firstName, lastName, owner, bio, room, phoneNumber, officeHours }) {
    const docID = this._collection.insert({
      image,
      firstName,
      lastName,
      owner,
      bio,
      room,
      phoneNumber,
      officeHours,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param image the new image (optional).
   * @param firstName the new first name (optional).
   * @param lastName the new last name (optional).
   * @param owner the new owner (optional).
   * @param bio the new bio (optional).
   * @param room the new room (optional).
   * @param phoneNumber the new phone number (optional).
   * @param officeHours the new office hours (optional).
   */
  update(docID, { image, firstName, lastName, owner, bio, room, phoneNumber, officeHours }) {
    const updateData = {};
    if (image) {
      updateData.image = image;
    }
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (owner) {
      updateData.owner = owner;
    }
    if (bio) {
      updateData.bio = bio;
    }
    if (room) {
      updateData.room = room;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (officeHours) {
      updateData.officeHours = officeHours;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the faculty associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the FacultyCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(facultyPublications.faculty, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(facultyPublications.facultyAdmin, function publish() {
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
  subscribeFaculty() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyPublications.faculty);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeFacultyAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyPublications.facultyAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.FACULTY]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const image = doc.image;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const owner = doc.owner;
    const bio = doc.bio;
    const room = doc.room;
    const phoneNumber = doc.phoneNumber;
    const officeHours = doc.officeHours;
    return { image, firstName, lastName, owner, bio, room, phoneNumber, officeHours };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Faculties = new FacultyCollection();
