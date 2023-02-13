import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const facultyRoomPublications = {
  faculty: 'facultyRoom',
  facultyAdmin: 'FacultyRoomAdmin',
};

class FacultyRoomCollection extends BaseCollection {
  constructor() {
    super('FacultyRoom', new SimpleSchema({
      email: String,
      roomKey: String,
      dateAssigned: {
        type: Date,
        optional: true,
      },
      owner: String,
    }));
  }

  /**
   * Defines a new Faculty item.
   * @param email address of the occupant.
   * @param roomKey the roomKey of the room.
   * @param dateAssigned the date the room was assigned to the occupant.
   * @param owner the owner of the faculty room assignment.
   * @return {String} the facID of the new document.
   */
  define({ email, roomKey, dateAssigned, owner }) {
    const facID = this._collection.insert({
      email,
      roomKey,
      dateAssigned,
      owner,
    });
    return facID;
  }

  /**
   * Updates the given document.
   * @param facRoomID the id of the document to update.
   * @param email the new occupant's email (optional).
   */
  update(facRoomID, { email }) {
    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    this._collection.update(facRoomID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or facID could not be found in this collection.
   * @param { String | Object } name A document or facID in this collection.
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
      // get the FacultyRoomCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(facultyRoomPublications.faculty, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(facultyRoomPublications.facultyRoomAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for facultyRoom owned by the current user.
   */
  subscribeFaculty() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyRoomPublications.facultyRoom);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeFacultyAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyRoomPublications.facultyRoomAdmin);
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
   * Returns an object representing the definition of facID in a format appropriate to the restoreOne or define function.
   * @param facID
   * @return {{owner: *, email: *, roomKey: *, dateAssigned: * }}
   */
  dumpOne(facID) {
    const doc = this.findDoc(facID);
    const owner = doc.owner;
    const email = doc.email;
    const roomKey = doc.roomKey;
    const dateAssigned = doc.dateAssigned;
    return { email, roomKey, dateAssigned, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const FacultyRoom = new FacultyRoomCollection();
