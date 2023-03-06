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
    await t.click('a.room-details');
    await t.expect(Selector(`#${PAGE_IDS.ROOM_DETAILS}`).exists).ok();
  }

  async addRoom() {
    await t.click(`#${COMPONENT_IDS.ADD_ROOM}`);
  }

  async editRoom() {
    await t.click('a.edit-room');
    await t.expect(Selector(`#${PAGE_IDS.EDIT_ROOM}`).exists).ok();
  }
}

export const listRoomAdminPage = new ListRoomAdmin();
