import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AddStudentForm {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async addStudent(addStudentCredentials) {
    await this.isDisplayed();
    await t.click(`#${COMPONENT_IDS.ADD_STUDENT_BUTTON}`);
    await t.typeText(`#${COMPONENT_IDS.ADD_STUDENT_FORM_FIRST_NAME}`, addStudentCredentials.firstName);
    await t.typeText(`#${COMPONENT_IDS.ADD_STUDENT_FORM_LAST_NAME}`, addStudentCredentials.lastName);
    await t.typeText(`#${COMPONENT_IDS.ADD_STUDENT_FORM_EMAIL}`, addStudentCredentials.email);
    await t.typeText(`#${COMPONENT_IDS.ADD_STUDENT_FORM_PASSWORD}`, addStudentCredentials.password);
    await t.click(`#${COMPONENT_IDS.ADD_STUDENT_FORM_SUBMIT}`);
  }
}

export const addStudentForm = new AddStudentForm();
