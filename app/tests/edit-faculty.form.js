import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class EditFacultyForm {
  constructor() {
    this.pageId = `#${PAGE_IDS.PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const loggedInUser = await Selector(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`).exists;
    if (loggedInUser) {
      await t.click(`#${COMPONENT_IDS.NAVBAR_CURRENT_USER}`);
      const profile = await Selector(`#${COMPONENT_IDS.NAVBAR_PROFILE}`).exists;
      if (profile) {
        await t.click(`#${COMPONENT_IDS.NAVBAR_PROFILE}`);
      }
    }
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to edit faculty * */
  async editFaculty(editFacultyCredentials) {
    await this.isDisplayed();
    const editProfileButton = Selector('#edit-faculty-profile');
    await t.click(editProfileButton);

    await t.typeText(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_FIRST_NAME}`, editFacultyCredentials.firstName, { replace: true });
    await t.typeText(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_LAST_NAME}`, editFacultyCredentials.lastName, { replace: true });
    await t.typeText(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_BIO}`, editFacultyCredentials.bio, { replace: true });
    const removePhone = Selector('#remove-faculty-phone');
    await t.click(removePhone);
    await t.typeText(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_PHONE}`, editFacultyCredentials.phone);

    const removeOfficeHour = Selector('#remove-faculty-office-hours');
    await t.click(removeOfficeHour);

    const daySelection = Selector(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_DAY}`);
    const dayOption = daySelection.find('option');
    await t
      .click(daySelection)
      .click(dayOption.nth(1));

    const startSelection = Selector(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_START_TIME}`);
    const startOption = startSelection.find('option');
    await t
      .click(startSelection)
      .click(startOption.nth(12));

    const endSelection = Selector(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_END_TIME}`);
    const endOption = endSelection.find('option');
    await t
      .click(endSelection)
      .click(endOption.nth(20));

    await t.click(`#${COMPONENT_IDS.EDIT_FACULTY_FORM_SUBMIT}`);
    await t.click('.swal-button--confirm');
    await t.click(`#${COMPONENT_IDS.CLOSE_EDIT_FACULTY_FORM}`);
  }
}

export const editFaculty = new EditFacultyForm();
