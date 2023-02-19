import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const clubPublications = {
  club: 'Club',
  clubAdmin: 'clubAdmin',
};

class ClubCollection extends BaseCollection {
  constructor() {
    super('Clubs', new SimpleSchema({
      clubName: String,
      image: {
        type: String,
        optional: true,
      },
      description: {
        type: String,
        optional: true,
      },
      website: {
        type: String,
        optional: true,
      },
      joinLink: {
        type: String,
        optional: true,
      },
      meetingDay: {
        type: String,
        optional: true,
      },
      meetingTime: {
        type: String,
        optional: true,
      },
      meetingLocation: {
        type: String,
        optional: true,
      },
      officers: {
        type: Array,
        optional: true,
      },
      'officers.$': {
        type: String,
      },
      advisor: {
        type: String,
        optional: true,
      },
    }));
  }

  /**
   * Defines a new Club item.
   * @return {String} the clubID of the new document.
   */
  define({ clubName, image, description, website, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor }) {
    const clubID = this._collection.insert({
      clubName,
      image,
      description,
      website,
      joinLink,
      meetingDay,
      meetingTime,
      meetingLocation,
      officers,
      advisor,
    });
    return clubID;
  }

  /**
   * Updates the given document.
   * @param clubID
   * @param clubName
   * @param image
   * @param description
   * @param website
   * @param officers
   */
  update(clubID, { clubName, image, description, website, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor }) {
    const updateData = {};
    if (clubName) {
      updateData.clubName = clubName;
    }
    if (image) {
      updateData.image = image;
    }
    if (description) {
      updateData.description = description;
    }
    if (website) {
      updateData.website = website;
    }
    if (joinLink) {
      updateData.joinLink = joinLink;
    }
    if (meetingDay) {
      updateData.meetingDay = meetingDay;
    }
    if (meetingTime) {
      updateData.meetingTime = meetingTime;
    }
    if (meetingLocation) {
      updateData.meetingLocation = meetingLocation;
    }
    if (officers) {
      updateData.officers = officers;
    }
    if (advisor) {
      updateData.advisor = advisor;
    }
    this._collection.update(clubID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or clubID could not be found in this collection.
   * @param { String | Object } name A document or clubID in this collection.
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
   * It publishes the entire collection for admin and just the club associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ClubCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(clubPublications.club, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(clubPublications.clubAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for club owned by the current user.
   */
  subscribeClub() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubPublications.club);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeClubAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubPublications.clubAdmin);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.STUDENT]);
  }

  /**
   * Returns an object representing the definition of clubID in a format appropriate to the restoreOne or define function.
   * @param clubID
   */
  dumpOne(clubID) {
    const doc = this.findDoc(clubID);
    const clubName = doc.clubName;
    const image = doc.image;
    const description = doc.description;
    const website = doc.website;
    const joinLink = doc.joinLink;
    const meetingDay = doc.meetingDay;
    const meetingTime = doc.meetingTime;
    const meetingLocation = doc.meetingLocation;
    const officers = doc.officers;
    const advisor = doc.advisor;
    return { clubName, image, description, website, joinLink, meetingDay, meetingTime, meetingLocation, officers, advisor };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Clubs = new ClubCollection();
