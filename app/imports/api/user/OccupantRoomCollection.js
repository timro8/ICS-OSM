import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const occupantRoomPublications = {
  occupantRoom: 'OccupantRoom',
  occupantRoomAdmin: 'OccupantRoomAdmin',
};

class OccupantRoomCollection extends BaseCollection {
  constructor() {
    super('OccupantRoom', new SimpleSchema({
      email: String,
      roomKey: String,
    }));
  }

  /**
   * Defines a new room occupant item.
   * @param email address of the occupant.
   * @param roomKey the roomKey of the room.
   * @return {String} the occupantID of the new document.
   */
  define({ email, roomKey }) {
    const occupantID = this._collection.insert({
      email,
      roomKey,
    });
    return occupantID;
  }

  /**
   * Updates the given document.
   * @param occupantRoomID the id of the document to update.
   * @param email the new occupant's email (optional).
   */
  update(occupantRoomID, { email, roomKey }) {
    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    if (roomKey) {
      updateData.roomKey = roomKey;
    }
    this._collection.update(occupantRoomID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or occupantID could not be found in this collection.
   * @param { String | Object } name A document occupantID in this collection.
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
   * It publishes the entire collection for admin and occupant.
   */
  publish() {
    if (Meteor.isServer) {
      // get the OccupantRoomCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(occupantRoomPublications.occupant, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(occupantRoomPublications.occupantRoomAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for OccupantRoom owned by the current user.
   */
  subscribeOccupantRoom() {
    if (Meteor.isClient) {
      return Meteor.subscribe(occupantRoomPublications.occupantRoom);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOccupantRoomAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(occupantRoomPublications.occupantRoomAdmin);
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
   * Returns an object representing the definition of occupantID in a format appropriate to the restoreOne or define function.
   * @param occupantID
   * @return {{ email: *, roomKey: * }}
   */
  dumpOne(occupantID) {
    const doc = this.findDoc(occupantID);
    const email = doc.email;
    const roomKey = doc.roomKey;
    return { email, roomKey };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OccupantRoom = new OccupantRoomCollection();
