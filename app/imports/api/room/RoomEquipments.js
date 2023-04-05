import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { Rooms } from './RoomCollection';

export const roomEquipmentPublications = {
  roomEquipment: 'RoomEquipments',
  roomEquipmentAdmin: 'RoomEquipmentAdmin',
};

class RoomEquipmentCollection extends BaseCollection {
  constructor() {
    super('RoomEquipments', new SimpleSchema({
      roomId: {
        type: String,
        optional: true,
      },
      description: String,
      quantity: Number,
      serialNumber: {
        type: String,
        optional: true,
      },
      assetTag: {
        type: String,
        optional: true,
      },
      equipmentType: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new Room equipment item.
   * @param roomId the Id of the room
   * @param description the description of the equipment.
   * @param quantity the quantity of the equipment.
   * @param serialNumber the serial number of the equipment.
   * @param assetTag the asset tag of the equipment.
   * @param equipmentType the type of the equipment.
   * @return {String} the docID of the new document.
   */
  define({ roomKey, description, quantity, serialNumber, assetTag, equipmentType }) {
    const room = Rooms.findOne({ roomKey: roomKey });
    const roomId = room._id;
    const docID = this._collection.insert({
      roomId,
      description,
      quantity,
      serialNumber,
      assetTag,
      equipmentType,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param roomId the id of the room (optional);
   * @param description the description of the equipment (optional).
   * @param quantity the quantity of the equipment(optional).
   * @param serialNumber the serial number of the equipment (optional).
   * @param assetTag the asset tag of the equipment (optional).
   * @param equipmentType the type of the equipment (optional)
   */
  update(docID, { roomId, description, quantity, serialNumber, assetTag, equipmentType }) {
    const updateData = {};
    if (description) {
      updateData.description = description;
    }
    if (roomId) {
      updateData.roomId = roomId;
    }
    if (quantity) {
      updateData.quantity = quantity;
    }
    if (serialNumber) {
      updateData.serialNumber = serialNumber;
    }
    if (assetTag) {
      updateData.assetTag = assetTag;
    }
    if (equipmentType) {
      updateData.equipmentType = equipmentType;
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
   * It publishes the entire collection for admin.
   */
  publish() {
    if (Meteor.isServer) {
      // get the RoomCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(roomEquipmentPublications.roomEquipment, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(roomEquipmentPublications.roomEquipmentAdmin, function publish() {
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
  subscribeRoomEquipment() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomEquipmentPublications.roomEquipment);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeRoomEquipmentAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(roomEquipmentPublications.roomEquipmentAdmin);
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
   * @return {{, roomId: *, description: *, quantity: *, serialNumber: *, assetTag: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const roomId = doc.roomId;
    const description = doc.description;
    const quantity = doc.quantity;
    const serialNumber = doc.serialNumber;
    const assetTag = doc.assetTag;
    const equipmentType = doc.equipmentType;
    return { roomId, description, quantity, serialNumber, assetTag, equipmentType };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const RoomEquipments = new RoomEquipmentCollection();
