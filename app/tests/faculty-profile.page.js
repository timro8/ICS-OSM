import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class FacultyProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async editFaculty() {
    await t.click(`#${COMPONENT_IDS.EDIT_FACULTY_PROFILE}`);
    await t.expect(Selector('#edit-faculty-modal').exists).ok();
  }
}

export const facultyProfilePage = new FacultyProfilePage();
