import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const ClubOfficersPublications = {
  ClubOfficers: 'ClubOfficers',
  ClubOfficersAdmin: 'ClubOfficersAdmin',
};

class ClubOfficersCollection extends BaseCollection {
  constructor() {
    super('ClubOfficers', new SimpleSchema({
      studentId: String,
      clubId: String,
      isPresident: Boolean,
      position: String,
    }));
  }

  /**
   * Defines a new ClubOfficers item.
   * @param studentId email of student
   * @param clubId name of club
   * @param isPresident determines if president
   * @param position title of position
   * @return {String} the docID of the new document.
   */
  define({ studentId, clubId, isPresident, position }) {
    const docID = this._collection.insert({
      studentId,
      clubId,
      isPresident,
      position,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param studentId email of student
   * @param clubId name of club
   * @param isPresident determines if president
   * @param position title of position
   */
  update(docID, { studentId, clubId, isPresident, position }) {
    const updateData = {};
    if (studentId) updateData.studentId = studentId;
    if (clubId) updateData.clubId = clubId;
    if (isPresident) updateData.isPresident = isPresident;
    if (position) updateData.position = position;
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
   * It publishes the entire collection for admin and just the ClubOfficers associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ClubOfficersCollection instance.
      const instance = this;
      /** This subscription publishes all users  */
      Meteor.publish(ClubOfficersPublications.ClubOfficers, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(ClubOfficersPublications.ClubOfficersAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for ClubOfficers owned by the current user.
   */
  subscribeClubOfficers() {
    if (Meteor.isClient) {
      return Meteor.subscribe(ClubOfficersPublications.ClubOfficers);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeClubOfficersAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(ClubOfficersPublications.ClubOfficersAdmin);
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
    const studentId = doc.studentId;
    const clubId = doc.clubId;
    const isPresident = doc.isPresident;
    const position = doc.position;
    return { studentId, clubId, isPresident, position };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const ClubOfficers = new ClubOfficersCollection();
