import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import {COMPONENT_IDS} from "../imports/ui/utilities/ComponentIDs";

class FacultyPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.FACULTY}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async gotoFacultyProfile() {
    // await t.click('a.faculty-card');
    await t.click(`#${COMPONENT_IDS.FACULTY_CARD}`);
    await t.expect(Selector(`#${PAGE_IDS.PROFILE}`).exists).ok();
  }

  async addFaculty() {
    await t.click(`#${COMPONENT_IDS.ADD_FACULTY}`);
    await t.expect(Selector('#add-faculty-modal').exists).ok();

  }
}

export const facultyPage = new FacultyPage();
