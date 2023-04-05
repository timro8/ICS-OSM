import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { Rooms } from './RoomCollection';

export const roomJacksPublications = {
  roomJacks: 'RoomJacks',
  roomJacksAdmin: 'RoomJacksAdmin',
};

class RoomJacksCollection extends BaseCollection {
  constructor() {
    super('RoomJacks', new SimpleSchema({
      roomId: {
        type: String,
        optional: true,
      },
      jackNumber: String,
      wallLocation: {
        type: String,
        optional: true,
      },
      IDFRoom: {
        type: String,
        optional: true,
      },
      description: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new Room item.
   * @param roomId the Id of the room
   * @param jackNumber the number of the jack.
   * @param wallLocation the wall location of the jack.
   * @param IDFRoom the IDF room of the jack
   * @param description the description of the jack number.
   * @return {String} the docID of the new document.
   */
  define({ roomKey, jackNumber, wallLocation, IDFRoom, description }) {

    const room = Rooms.findOne({ roomKey: roomKey });
    const roomId = room._id;

    const docID = this._collection.insert({
      roomId,
      jackNumber,
      wallLocation,
      IDFRoom,
      description,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param roomId the ID of the room (optional).
   * @param jackNumber the number of the jack (optional).
   * @param wallLocation the location of the jack (optional).
   * @param IDFRoom the IDFRoom of the jack (optional).
   * @param description the new status (optional).
   */
  update(docID, { jackNumber, roomId, wallLocation, description, IDFRoom }) {
    const updateData = {};
    if (jackNumber) {
      updateData.jackNumber = jackNumber;
    }
    if (roomId) {
      updateData.roomId = roomId;
    }
    if (wallLocation) {
      updateData.wallLocation = wallLocation;
    }
    if (IDFRoom) {
      updateData.IDFRoom = IDFRoom;
    }
    if (description) {
      updateData.description = description;
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
   * It publishes the entire collection for all users.
   */
  publish() {
    if (Meteor.isServer) {
      // get the RoomCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(roomJacksPublications.roomJacks, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(roomJacksPublications.roomJacksAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for room owned by the current user.
   */
  subscribeRoomJacks() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomJacksPublications.roomJacks);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeRoomJacksAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomJacksPublications.roomJacksAdmin);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.TECH, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{ roomId: *, wallLocation: *, description: *, IDFRoom: *, jackNumber: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const roomId = doc.roomId;
    const jackNumber = doc.jackNumber;
    const wallLocation = doc.wallLocation;
    const description = doc.description;
    const IDFRoom = doc.IDFRoom;
    return { roomId, jackNumber, wallLocation, IDFRoom, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const RoomJacks = new RoomJacksCollection();
