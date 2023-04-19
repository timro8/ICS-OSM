import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class ClubPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.CLUB}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async editClub() {
    await t.click(`#${COMPONENT_IDS.EDIT_CLUB}`);
    await t.expect(Selector('#edit-club-modal').exists).ok();
  }
}

export const clubPage = new ClubPage();
