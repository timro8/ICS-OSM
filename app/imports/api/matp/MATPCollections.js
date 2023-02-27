import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { Rooms } from '../room/RoomCollection';
import { Faculties } from '../faculty/FacultyCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Events302 } from '../events/Events302Collection';
import { RoomNotes } from '../room/RoomNotes';
import { RoomJacks } from '../room/RoomJacks';
import { RoomEquipments } from '../room/RoomEquipments';
import { FacultyProfiles } from '../user/FacultyProfileCollection';
import { FacultyRoom } from '../faculty/FacultyRoomCollection';
import { Discussions } from '../discussion/Discussion';
import { Clubs } from '../club/Club';

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATPCollections collections
    this.collections = [
      AdminProfiles,
      Stuffs,
      UserProfiles,
      FacultyProfiles,
      Rooms,
      Faculties,
      Events302,
      RoomNotes,
      RoomJacks,
      RoomEquipments,
      FacultyRoom,
      Discussions,
      Clubs,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      FacultyProfiles,
      Stuffs,
      Rooms,
      Faculties,
      Events302,
      RoomNotes,
      RoomJacks,
      RoomEquipments,
      FacultyRoom,
      Discussions,
      Clubs,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATPCollections', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MARTPCollections.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATPCollections = new MATPClass();
