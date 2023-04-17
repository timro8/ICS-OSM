import { _ } from 'meteor/underscore';
import { Rooms } from '../room/RoomCollection';
import { FacultyProfiles } from '../user/FacultyProfileCollection';
import { OfficeProfiles } from '../user/OfficeProfileCollection';
import { TechProfiles } from '../user/TechProfileCollection';
import { OccupantRoom } from '../user/OccupantRoomCollection';

/**
 * Returns the room data with occupants,
 * @param room room data.
 * @returns the room data object
 */
export const getRoomData = (room) => {
  // Get the data for the room based on the roomId
  const data = Rooms.findDoc({ _id: room });

  // Get the data for the roomOccupant based on the roomId
  const roomOccupant = OccupantRoom.find({ roomId: room }).fetch();
  // Get the data for the Faculty, Office, Tech based on the roomOccupant userId
  const occupants = roomOccupant.map(occupant => {
    // Return FacultyProfiles if userId is defined
    if (FacultyProfiles.isDefined(occupant.userId)) {
      return FacultyProfiles.findDoc(occupant.userId);
    }
    // Return OfficeProfiles if userId is defined
    if (OfficeProfiles.isDefined(occupant.userId)) {
      return OfficeProfiles.findDoc(occupant.userId);
    }
    // Return TechProfiles if userId is defined
    if (TechProfiles.isDefined(occupant.userId)) {
      return TechProfiles.findDoc(occupant.userId);
    }
    // Returns empty if no Faculty, Office, or Tech is defined
    return '';
  });

  return _.extend({}, data, { occupants: occupants });
};
