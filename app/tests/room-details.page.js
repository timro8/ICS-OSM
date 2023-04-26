import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class RoomDetailsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ROOM_DETAILS}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async addEquipment() {
    await t.click(`#${COMPONENT_IDS.ADD_EQUIPMENT}`);
    await t.expect(Selector('#add-equip-modal').exists).ok();
  }

  async addNote() {
    await t.click(`#${COMPONENT_IDS.ADD_NOTE}`);
    await t.expect(Selector('#add-note-modal').exists).ok();
  }
}

export const roomDetailsPage = new RoomDetailsPage();
