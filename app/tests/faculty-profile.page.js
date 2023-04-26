import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class FacultyProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }
}

export const facultyProfilePage = new FacultyProfilePage();
