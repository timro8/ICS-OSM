import { _ } from 'meteor/underscore';
import { Rooms } from '../room/RoomCollection';
import { FacultyProfiles } from '../user/FacultyProfileCollection';
import { StaffProfiles } from '../user/StaffProfileCollection';
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
  // Get the data for the Faculty or Staff based on the roomOccupant userId
  const occupants = roomOccupant.map(occupant => {
    //console.log(occupant.userId);
    // Return FacultyProfiles if userId is defined
    if (FacultyProfiles.isDefined(occupant.userId)) {
      return FacultyProfiles.findDoc(occupant.userId);
    }
    // Return StaffProfiles if userId is defined
    if (StaffProfiles.isDefined(occupant.userId)) {
      return StaffProfiles.findDoc(occupant.userId);
    }
    // Returns empty if no Faculty or Staff is defined
    return '';
  });

  return _.extend({}, data, { occupants: occupants });
};
