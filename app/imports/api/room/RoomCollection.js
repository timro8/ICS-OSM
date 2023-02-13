import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const roomLocations = ['POST'];

export const roomStatus = ['Occupied', 'Vacant', 'Out of Commission', 'Other'];

export const roomClassifications = ['Office', 'Sink', 'Conference', 'Cubicle', 'ICS Library', 'ASECOLAB', 'Mail', 'Main Office', 'Lab', 'ICSpace', 'Storage', 'ICS IT', 'OFCSVC', 'LNG'];

export const roomPublications = {
  room: 'Room',
  roomAdmin: 'RoomAdmin',
};

class RoomCollection extends BaseCollection {
  constructor() {
    super('Rooms', new SimpleSchema({
      roomKey: { type: String, index: true, unique: true },
      roomNumber: String,
      location: {
        type: String,
        allowedValues: roomLocations,
        defaultValue: 'POST',
      },
      status: {
        type: String,
        allowedValues: roomStatus,
        defaultValue: 'Occupied',
      },
      capacity: {
        type: Number,
        optional: true,
      },
      roomSqFoot: {
        type: String,
        optional: true,
      },
      roomClassification: {
        type: String,
        allowedValues: roomClassifications,
        defaultValue: 'Office',
      },
      occupants: [String],
      picture: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new Room item.
   * @param roomKey the unique Id of the room.
   * @param roomNumber the number of the room.
   * @param location the location of the room.
   * @param status the status of the room.
   * @param capacity the capacity for the room.
   * @param roomSqFoot the square footage of the room.
   * @param roomClassification the classification of the room.
   * @param occupants the occupants of the room.
   * @param picture the owner of the room.
   * @return {String} the docID of the new document.
   */
  define({ roomKey, roomNumber, location, status, capacity, roomSqFoot, roomClassification, occupants, picture }) {
    const docID = this._collection.insert({
      roomKey,
      roomNumber,
      location,
      status,
      capacity,
      roomSqFoot,
      roomClassification,
      occupants,
      picture,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param status the new status (optional).
   * @param capacity the new room capacity (optional).
   * @param roomSqFoot the new square footage of the room (optional).
   * @param roomClassification the new room classification (optional).
   * @param picture the new picture of the room (optional).
   */
  update(docID, { status, capacity, roomSqFoot, roomClassification, occupants, picture }) {
    const updateData = {};
    if (status) {
      updateData.status = status;
    }
    if (capacity) {
      updateData.capacity = capacity;
    }
    if (roomSqFoot) {
      updateData.roomSqFoot = roomSqFoot;
    }
    if (roomClassification) {
      updateData.roomClassification = roomClassification;
    }
    if (occupants) {
      updateData.occupants = occupants;
    }
    if (picture) {
      updateData.picture = picture;
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
   * It publishes the entire collection for admin and just the room associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the RoomCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(roomPublications.room, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(roomPublications.roomAdmin, function publish() {
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
  subscribeRoom() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomPublications.room);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeRoomAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomPublications.roomAdmin);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{occupants: (*|number), roomKey: *, roomNumber: *, location: *, status: *, capacity: *, roomSqFoot: *, roomClassification: *, picture: * }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const roomKey = doc.roomKey;
    const roomNumber = doc.roomNumber;
    const location = doc.location;
    const status = doc.status;
    const capacity = doc.capacity;
    const roomSqFoot = doc.roomSqFoot;
    const roomClassification = doc.roomClassification;
    const occupants = doc.occupants;
    const picture = doc.picture;
    return { roomKey, roomNumber, location, status, capacity, roomSqFoot, roomClassification, occupants, picture };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Rooms = new RoomCollection();
