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

  async addRoom() {
    await t.click('#add-button');
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_ROOM_FORM}`).exists).ok();
  }

  async editRoom() {
    // await t.click('a.edit-room');
    await t.click('#edit-room-button');
    await t.expect(Selector(`#${PAGE_IDS.EDIT_ROOM}`).exists).ok();
  }
}

export const listRoomAdminPage = new ListRoomAdmin();
