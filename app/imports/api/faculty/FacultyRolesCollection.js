import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const FACULTY_ROLES = ['PROFESSOR', 'TA', 'RA', 'N/A'];
export const FacultyRolePublications = {
  FacultyRole: 'FacultyRole',
  FacultyRoleAdmin: 'FacultyRoleAdmin',
};

class FacultyRoleCollection extends BaseCollection {
  constructor() {
    super('FacultyRole', new SimpleSchema({
      role: {
        type: String,
        allowedValues: FACULTY_ROLES,
        defaultValue: 'N/A',
      },
      userId: { type: String, optional: false },
    }));
  }

  /**
   * Defines a new FacultyRole.
   * @param role role of faculty member.
   * @param id user id of faculty member.
   * @return {String} the docID of the new document.
   */
  define({ role, id }) {
    const docID = this._collection.insert({
      role,
      id,
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
  update(docID, { role }) {
    const updateData = {};
    if (role) {
      updateData.role = role;
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
   * It publishes the entire collection for admin and just the FacultyRole associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the FacultyRoleCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(FacultyRolePublications.FacultyRole, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(FacultyRolePublications.FacultyRoleAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for FacultyRole owned by the current user.
   */
  subscribeFacultyRole() {
    if (Meteor.isClient) {
      return Meteor.subscribe(FacultyRolePublications.FacultyRole);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeFacultyRoleAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(FacultyRolePublications.FacultyRoleAdmin);
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
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const quantity = doc.quantity;
    const condition = doc.condition;
    const owner = doc.owner;
    return { name, quantity, condition, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const FacultyRoles = new FacultyRoleCollection();
