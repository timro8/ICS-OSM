import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class TechPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.LIST_ROOM_ADMIN}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async gotoRoomDetails() {
    await t.click('#room-card');
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
    await t.click(Selector('button').withText('Rooms'));
    await t.typeText(`#${COMPONENT_IDS.SEARCH_INPUT}`, addNewRoom.roomNumber);
    await t.click(`#${COMPONENT_IDS.SEARCH_BUTTON}`);
    await t.click(`#${COMPONENT_IDS.ROOM_CARD}`);

  }

  async editRoom() {
    // await t.click('a.edit-room');
    await t.click('#edit-room-button');
    await t.expect(Selector(`#${PAGE_IDS.EDIT_ROOM}`).exists).ok();
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

    await t.click(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_EQUIPMENT_FORM_CLOSE_BUTTON}`);

    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN}`);
    await t.click(Selector('button').withText('Equipment'));
    /*
    need to implement the search
    await t.click('#equipment-search');
    await t.typeText(Selector('input'), 'chair');
    await t.pressKey('tab');
    await t.pressKey('enter');
    await t.click(`#${COMPONENT_IDS.LIST_ROOM_ADMIN_EQUIPMENT}`);
     */
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

    /*
    * need to implement search after add
    * */
  }
}

export const techPageComponents = new TechPage();
