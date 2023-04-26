import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AddStaffForm {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add staff then check if staff added successfully */
  async addStaff(addStaffCredentials) {
    await this.isDisplayed();
    await t.click(`#${COMPONENT_IDS.ADD_STAFF}`);

    await t.typeText(Selector('[name="firstName"]'), addStaffCredentials.firstName);
    await t.typeText(Selector('[name="lastName"]'), addStaffCredentials.lastName);

    const roomSelection = Selector('[name="room');
    const roomOption = roomSelection.find('option');
    // https://testcafe.io/documentation/402806/recipes/basics/test-select-elements
    // https://testcafe.io/documentation/402748/reference/test-api/selector/nth
    await t
      .click(roomSelection)
      .click(roomOption.nth(2));

    const roleSelection = Selector('[name="role"]');
    const roleOption = roleSelection.find('option');
    await t
      .click(roleSelection)
      .click(roleOption.nth(1));

    await t.typeText('[name="email"]', addStaffCredentials.email);
    await t.typeText('[name="password"]', addStaffCredentials.password);
    await t.typeText('[name="bio"]', addStaffCredentials.bio);
    await t.typeText('[name="phoneNumber"]', addStaffCredentials.phone);

    await t.click('[type="submit"]');
    await t.click('.swal-button--confirm');
    await t.click('#close-button');

    const addedStaff = Selector('#staff-link').nth(-1);
    await t.click(addedStaff);
  }
}

export const addStaff = new AddStaffForm();
