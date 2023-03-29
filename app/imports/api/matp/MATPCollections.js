import { Meteor } from 'meteor/meteor';
import { Rooms } from '../room/RoomCollection';
import { Faculties } from '../faculty/FacultyCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Events302 } from '../events/Events302Collection';
import { RoomNotes } from '../room/RoomNotes';
import { RoomJacks } from '../room/RoomJacks';
import { RoomEquipments } from '../room/RoomEquipments';
import { FacultyProfiles } from '../user/FacultyProfileCollection';
import { OccupantRoom } from '../user/OccupantRoomCollection';
import { Discussions } from '../discussion/Discussion';
import { Clubs } from '../club/Club';
import { ClubOfficers } from '../clubofficers/ClubOfficersCollection';
import { StudentProfiles } from '../user/StudentProfileCollection';
import { OfficeProfiles } from '../user/OfficeProfileCollection';
import { TechProfiles } from '../user/TechProfileCollection';

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATPCollections collections
    this.collections = [
      AdminProfiles,
      UserProfiles,
      FacultyProfiles,
      StudentProfiles,
      OfficeProfiles,
      TechProfiles,
      Rooms,
      Faculties,
      Events302,
      RoomNotes,
      RoomJacks,
      RoomEquipments,
      OccupantRoom,
      Discussions,
      Clubs,
      ClubOfficers,
      OfficeProfiles,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      FacultyProfiles,
      StudentProfiles,
      OfficeProfiles,
      TechProfiles,
      Rooms,
      Faculties,
      Events302,
      RoomNotes,
      RoomJacks,
      RoomEquipments,
      OccupantRoom,
      Discussions,
      Clubs,
      ClubOfficers,
      OfficeProfiles,
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
    console.log(collection);
    if (!collection) {
      throw new Meteor.Error(`Called MARTPCollections.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATPCollections = new MATPClass();
