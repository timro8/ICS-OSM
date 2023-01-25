import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const roomLocations = ['POST'];

export const roomStatus = ['Occupied', 'Vacant', 'Out of Commission'];

export const roomPublications = {
  room: 'Room',
  roomAdmin: 'RoomAdmin',
};

class RoomCollection extends BaseCollection {
  constructor() {
    super('Rooms', new SimpleSchema({
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
      roomNotes: {
        type: String,
        optional: true,
      },
      owner: String,
      picture: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new Room item.
   * @param roomNumber the number of the room.
   * @param location the location of the room.
   * @param status the status of the room.
   * @param roomNotes the notes for the room.
   * @param owner the owner of the room.
   * @param picture the owner of the room.
   * @return {String} the docID of the new document.
   */
  define({ roomNumber, location, status, roomNotes, owner, picture }) {
    const docID = this._collection.insert({
      roomNumber,
      location,
      status,
      roomNotes,
      owner,
      picture,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param status the new status (optional).
   * @param roomNotes the new room notes (optional).
   * @param picture the new picture of the room (optional).
   */
  update(docID, { status, roomNotes, picture }) {
    const updateData = {};
    if (status) {
      updateData.status = status;
    }
    if (roomNotes) {
      updateData.roomNotes = roomNotes;
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
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
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
   * @return {{owner: (*|number), roomNumber: *, location: *, status: *, roomNotes: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const roomNumber = doc.roomNumber;
    const location = doc.location;
    const status = doc.status;
    const roomNotes = doc.roomNotes;
    const owner = doc.owner;
    return { roomNumber, location, status, roomNotes, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Rooms = new RoomCollection();
