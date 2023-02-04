import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const Events302Publications = {
  Events302: 'Events302',
  Events302Admin: 'Events302Admin',
};

class Events302Collection extends BaseCollection {
  constructor() {
    super('Events302', new SimpleSchema({
      start: Number,
      end: Number,
      owner: String,
    }));
  }

  /**
   * Defines a new Events302 item.
   * @param start start time of the event
   * @param end end time of event
   * @param owner owner of the event
   * @return {String} the docID of the new document.
   */
  define({ start, end, owner }) {
    const docID = this._collection.insert({
      start,
      end,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { start, end }) {
    const updateData = {};
    if (start) updateData.start = start;
    if (end) updateData.end = end;
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
   * It publishes the entire collection for admin and just the Events302 associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the Events302Collection instance.
      const instance = this;
      /** This subscription publishes all users  */
      Meteor.publish(Events302Publications.Events302, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(Events302Publications.Events302Admin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for Events302 owned by the current user.
   */
  subscribeEvents302() {
    if (Meteor.isClient) {
      return Meteor.subscribe(Events302Publications.Events302);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeEvents302Admin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(Events302Publications.Events302Admin);
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
   * @return {{start: (*|number), end: *, owner: * }}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const start = doc.start;
    const end = doc.end;
    const owner = doc.owner;
    return { start, end, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events302 = new Events302Collection();
