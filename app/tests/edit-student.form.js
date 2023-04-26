import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class EditStudentForm {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async editStudent(editStudentCredentials) {
    await this.isDisplayed();
    await t.click(`#${COMPONENT_IDS.EDIT_STUDENT}`);
    await t.typeText(`#${COMPONENT_IDS.EDIT_STUDENT_FORM_FIRST_NAME}`, editStudentCredentials.firstName);
    await t.typeText(`#${COMPONENT_IDS.EDIT_STUDENT_FORM_LAST_NAME}`, editStudentCredentials.lastName);
    await t.click(`#${COMPONENT_IDS.EDIT_STUDENT_FORM_SUBMIT}`);
  }
}

export const editStudentForm = new EditStudentForm();
