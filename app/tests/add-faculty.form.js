import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AddFacultyForm {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add faculty, then check if faculty added successfully */
  async addFaculty(addFacultyCredentials) {
    await this.isDisplayed();
    await t.click(`#${COMPONENT_IDS.ADD_FACULTY}`);

    await t.typeText(`#${COMPONENT_IDS.ADD_FACULTY_FORM_FIRST_NAME}`, addFacultyCredentials.firstName);
    await t.typeText(`#${COMPONENT_IDS.ADD_FACULTY_FORM_LAST_NAME}`, addFacultyCredentials.lastName);

    const roomSelection = Selector(`#${COMPONENT_IDS.ADD_FACULTY_FORM_ROOM}`);
    const roomOption = roomSelection.find('option');
    // https://testcafe.io/documentation/402806/recipes/basics/test-select-elements
    // https://testcafe.io/documentation/402748/reference/test-api/selector/nth
    await t
      .click(roomSelection)
      .click(roomOption.nth(2));

    const roleSelection = Selector(`#${COMPONENT_IDS.ADD_FACULTY_FORM_ROLE}`);
    const roleOption = roleSelection.find('option');
    await t
      .click(roleSelection)
      .click(roleOption.nth(1));

    await t.typeText(`#${COMPONENT_IDS.ADD_FACULTY_FORM_EMAIL}`, addFacultyCredentials.email);
    await t.typeText(`#${COMPONENT_IDS.ADD_FACULTY_FORM_PASSWORD}`, addFacultyCredentials.password);
    await t.typeText(`#${COMPONENT_IDS.ADD_FACULTY_FORM_BIO}`, addFacultyCredentials.bio);
    await t.typeText(`#${COMPONENT_IDS.ADD_FACULTY_FORM_PHONE}`, addFacultyCredentials.phone);

    const daySelection = Selector(`#${COMPONENT_IDS.ADD_FACULTY_FORM_DAY}`);
    const dayOption = daySelection.find('option');
    await t
      .click(daySelection)
      .click(dayOption.nth(1));

    const startSelection = Selector(`#${COMPONENT_IDS.ADD_FACULTY_FORM_START_TIME}`);
    const startOption = startSelection.find('option');
    await t
      .click(startSelection)
      .click(startOption.nth(22));

    const endSelection = Selector(`#${COMPONENT_IDS.ADD_FACULTY_FORM_END_TIME}`);
    const endOption = endSelection.find('option');
    await t
      .click(endSelection)
      .click(endOption.nth(30));

    await t.click(`#${COMPONENT_IDS.ADD_FACULTY_FORM_SUBMIT}`);
    await t.click('.swal-button--confirm');
    await t.click(`#${COMPONENT_IDS.CLOSE_ADD_FACULTY_FORM}`);
    await t.click(`#${COMPONENT_IDS.NAVBAR_FACULTY}`);
    await t.typeText(`#${COMPONENT_IDS.SEARCH_INPUT}`, addFacultyCredentials.firstName);
    await t.click(`#${COMPONENT_IDS.SEARCH_BUTTON}`);
    await t.click(`#${COMPONENT_IDS.FACULTY_CARD}`);
  }
}

export const addFaculty = new AddFacultyForm();
