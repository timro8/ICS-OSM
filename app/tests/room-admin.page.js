import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class ListRoomAdmin {
  constructor() {
    this.pageId = `#${PAGE_IDS.LIST_ROOM_ADMIN}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async gotoRoomDetails() {
    await t.click(Selector('a').withText('POST 302'));
    await t.expect(Selector(`#${PAGE_IDS.ROOM_DETAILS}`).exists).ok();
  }

  async addRoom(addNewRoom) {
    await t.click(Selector('button').withText('Rooms'));
    await t.click(Selector('#add-room-form'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM}`).exists).ok();

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_ROOMKEY}`, addNewRoom.roomKey);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_ROOMNUMBER}`, addNewRoom.roomNumber);

    const selectLocation = Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM_LOCATION}`);
    const optionLocation = selectLocation.find('option');
    await t
      .click(selectLocation)
      .click(optionLocation.nth(0));

    const selectStatus = Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM_STATUS}`);
    const optionStatus = selectStatus.find('option');
    await t
      .click(selectStatus)
      .click(optionStatus.nth(0));

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_CAPACITY}`, addNewRoom.capacity);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_ROOM_SQ_FT}`, addNewRoom.roomSqFt);

    const selectClassification = Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM_CLASSIFICATION}`);
    const optionClassification = selectClassification.find('option');
    await t
      .click(selectClassification)
      .click(optionClassification.nth(0));

    await t.click(`#${COMPONENT_IDS.ADD_ROOM_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));
    await t.click(`#${COMPONENT_IDS.ADD_ROOM_FORM_CLOSE_BUTTON}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN}`);
  }

  async editRoom(editRoom) {
    // await t.click('a.edit-room');
    await t.click('#edit-room-button');
    await t.expect(Selector(`#${PAGE_IDS.EDIT_ROOM}`).exists).ok();

    const selectStatus = Selector(`#${COMPONENT_IDS.EDIT_ROOM_FORM_STATUS}`);
    const optionStatus = selectStatus.find('option');
    await t
      .click(selectStatus)
      .click(optionStatus.nth(0));

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_FORM_CAPACITY}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_FORM_CAPACITY}`, editRoom.capacity);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_FORM_ROOMSQFT}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_FORM_ROOMSQFT}`, editRoom.roomSqFt);

    const selectClassification = Selector(`#${COMPONENT_IDS.EDIT_ROOM_FORM_CLASSIFICATION}`);
    const optionClassification = selectClassification.find('option');
    await t
      .click(selectClassification)
      .click(optionClassification.nth(2));

    await t.click(`#${COMPONENT_IDS.EDIT_ROOM_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));
  }

  async addEquipment(addNewRoomEquipment) {
    await t.click(Selector('button').withText('Equipment'));
    await t.click(Selector('#add-equipment'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM}`).exists).ok();

    const selectRoom = Selector(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_ROOMS}`);
    const optionRoom = selectRoom.find('option');
    await t
      .click(selectRoom)
      .click(optionRoom.nth(6));

    await t.typeText(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_QUANTITY}`, addNewRoomEquipment.quantity);

    await t.typeText(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_DESCRIPTION}`, addNewRoomEquipment.description);

    await t.typeText(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_SERIALNUMBER}`, addNewRoomEquipment.serialNumber);

    await t.typeText(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_ASSETTAG}`, addNewRoomEquipment.assetTag);

    const selectType = Selector(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_EQUIPMENTTYPE}`);
    const optionType = selectType.find('option');
    await t
      .click(selectType)
      .click(optionType.nth(1));

    await t.click(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_CLOSE_BUTTON}`);

    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN}`);
    await t.click(Selector('button').withText('Equipment'));
  }

  async addJack(addNewRoomJack) {
    await t.click(Selector('button').withText('Jacks'));
    await t.click(Selector('#add-jack'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_JACK_FORM}`).exists).ok();

    const selectRoom = Selector(`#${COMPONENT_IDS.ADD_JACK_FORM_ROOMS}`);
    const optionRoom = selectRoom.find('option');
    await t
      .click(selectRoom)
      .click(optionRoom.nth(6));

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_JACKNUMBER}`, addNewRoomJack.jackNumber);

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_WALLLOCATION}`, addNewRoomJack.wallLocation);

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_IDFROOM}`, addNewRoomJack.IDFRoom);

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_DESCRIPTION}`, addNewRoomJack.description);

    await t.click(`#${COMPONENT_IDS.ADD_JACK_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_JACK_FORM_CLOSE_BUTTON}`);

    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN}`);
  }

  async addRoomOccupant() {
    await t.click(Selector('#add-occupant'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_OCCUPANT_FORM}`).exists).ok();

    const selectOccupant = Selector(`#${COMPONENT_IDS.ADD_OCCUPANT_FORM_OCCUPANT}`);
    const optionOccupant = selectOccupant.find('option');

    await t
      .click(selectOccupant)
      .click(optionOccupant.nth(2));

    await t.click(`#${COMPONENT_IDS.ADD_OCCUPANT_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_OCCUPANT_FORM_CLOSE_BUTTON}`);
  }

  async addRoomNote() {
    await t.click(Selector('#add-note'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_NOTE_FORM}`).exists).ok();

    await t.typeText(`#${COMPONENT_IDS.ADD_NOTE_FORM_NOTE}`, 'Test note');

    await t.click(`#${COMPONENT_IDS.ADD_NOTE_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_NOTE_FORM_CLOSE_BUTTON}`);
  }

  async addRoomEquipment(addNewRoomEquipment) {
    await t.click(Selector('#add-room-equipment'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM}`).exists).ok();

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_DESCRIPTION}`, addNewRoomEquipment.description);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_QUANTITY}`, addNewRoomEquipment.quantity);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_SERIALNUMBER}`, addNewRoomEquipment.serialNumber);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_ASSETTAG}`, addNewRoomEquipment.assetTag);

    const selectType = Selector(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_EQUIPMENTTYPE}`);
    const optionType = selectType.find('option');
    await t
      .click(selectType)
      .click(optionType.nth(1));

    await t.click(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_ROOM_EQUIPMENT_FORM_CLOSE_BUTTON}`);
  }

  async addRoomJack(addNewRoomDetailJack) {
    await t.click(Selector('#add-room-jack'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM}`).exists).ok();

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM_JACKNUMBER}`, addNewRoomDetailJack.jackNumber);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM_WALLLOCATION}`, addNewRoomDetailJack.wallLocation);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM_IDFROOM}`, addNewRoomDetailJack.IDFRoom);

    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM_DESCRIPTION}`, addNewRoomDetailJack.description);

    await t.click(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_ROOM_JACK_FORM_CLOSE_BUTTON}`);
  }

  async editRoomEquipment(editRoomEquipment) {
    await t.click('#edit-room-detail-equipment');
    await t.expect(Selector(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM}`).exists).ok();

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_DESCRIPTION}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_DESCRIPTION}`, editRoomEquipment.description);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_QUANTITY}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_QUANTITY}`, editRoomEquipment.quantity);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_SERIALNUMBER}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_SERIALNUMBER}`, editRoomEquipment.serialNumber);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_ASSETTAG}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_ASSETTAG}`, editRoomEquipment.assetTag);

    const selectType = Selector(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_EQUIPMENTTYPE}`);
    const optionType = selectType.find('option');
    await t
      .click(selectType)
      .click(optionType.nth(1));

    await t.click(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_EQUIPMENT_FORM_CLOSE_BUTTON}`);
  }

  async editRoomJack(editRoomJack) {
    await t.click('#edit-room-detail-jack');
    await t.expect(Selector(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM}`).exists).ok();

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_JACKNUMBER}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_JACKNUMBER}`, editRoomJack.jackNumber);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_WALLLOCATION}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_WALLLOCATION}`, editRoomJack.wallLocation);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_IDFROOM}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_IDFROOM}`, editRoomJack.IDFRoom);

    await t.selectText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_DESCRIPTION}`);
    await t.pressKey('shift+right');
    await t.pressKey('delete');
    await t.typeText(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_DESCRIPTION}`, editRoomJack.description);

    await t.click(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.EDIT_ROOM_DETAIL_JACK_FORM_CLOSE_BUTTON}`);
  }

  async deleteAdminJack() {
    await t.click(Selector('button').withText('Jacks'));
    await t.click(`#${COMPONENT_IDS.DELETE_JACK}`);

    await t.click(Selector('.swal-button--confirm'));
  }

  async deleteAdminEquipment() {
    await t.click(Selector('button').withText('Equipment'));
    await t.click(`#${COMPONENT_IDS.DELETE_ROOM_ADMIN_EQUIPMENT}`);

    await t.click(Selector('.swal-button--confirm'));
  }

  async deleteRoomOccupant() {
    await t.click(Selector('#delete-occupant'));

    await t.click(Selector('.swal-button--confirm'));
  }

  async deleteRoomDetailEquipment() {
    await t.click(Selector('#delete-room-detail-equipment'));

    await t.click(Selector('.swal-button--confirm'));
  }

  async deleteRoomDetailJack() {
    await t.click(Selector('#delete-room-admin-jack'));

    await t.click(Selector('.swal-button--confirm'));
  }

}

export const listRoomAdminPage = new ListRoomAdmin();
