import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class HomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async deleteStudent() {
    await t.click('#delete-student-btn');
    await t.expect(Selector('#delete-student-modal').exists).ok();
    await t.click(`#${COMPONENT_IDS.DELETE_STUDENT}`);
  }

  async deleteFaculty() {
    await t.click('#delete-faculty');
  }
}

export const homePage = new HomePage();
