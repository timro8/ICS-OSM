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
    await t.click('#room-card');
    await t.expect(Selector(`#${PAGE_IDS.ROOM_DETAILS}`).exists).ok();
  }

  async addRoom(addNewRoom) {
    await t.click('#add-button');
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM}`).exists).ok();
    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_ROOMKEY}`, addNewRoom.roomKey);
    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_ROOMNUMBER}`, addNewRoom.roomNumber);
    const selectLocation = Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM_LOCATION}`);
    const optionLocation = selectLocation.find('option');
    await t
      .click(selectLocation)
      .click(optionLocation.nth(1));
    const selectStatus = Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM_STATUS}`);
    const optionStatus = selectStatus.find('option');
    await t
      .click(selectStatus)
      .click(optionStatus.nth(1));
    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_CAPACITY}`, addNewRoom.capacity);
    await t.typeText(`#${COMPONENT_IDS.ADD_ROOM_FORM_ROOM_SQ_FT}`, addNewRoom.roomSqFt);
    const selectClassification = Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM_CLASSIFICATION}`);
    const optionClassification = selectClassification.find('option');
    await t
      .click(selectClassification)
      .click(optionClassification.nth(1));
    await t.click(`#${COMPONENT_IDS.ADD_ROOM_FORM_SUBMIT} input.btn.btn-primary`);
    await t.click(Selector('.swal-button--confirm'));
    await t.click(`#${COMPONENT_IDS.ADD_ROOM_FORM_CLOSE_BUTTON}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN}`);
    await t.typeText(`#${COMPONENT_IDS.SEARCH_INPUT}`, addNewRoom.roomNumber);
    await t.click(`#${COMPONENT_IDS.SEARCH_BUTTON}`);
    await t.click(`#${COMPONENT_IDS.ROOM_CARD}`);

  }

  async editRoom() {
    // await t.click('a.edit-room');
    await t.click('#edit-room-button');
    await t.expect(Selector(`#${PAGE_IDS.EDIT_ROOM}`).exists).ok();
  }
}

export const listRoomAdminPage = new ListRoomAdmin();
