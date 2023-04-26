import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class EditStaffForm {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to add staff then check if staff added successfully */
  async editStaff(editStaffCredentials) {
    await this.isDisplayed();
    await t.click('#edit-staff-button');

    await t.typeText(Selector('[name="firstName"]'), editStaffCredentials.firstName, { replace: true });
    await t.typeText(Selector('[name="lastName"]'), editStaffCredentials.lastName, { replace: true });
    await t.typeText('[name="bio"]', editStaffCredentials.bio, { replace: true });
    await t.click('#remove-phone-button');
    await t.typeText('[name="phoneNumber"]', editStaffCredentials.phone, { replace: true });

    await t.click('[type="submit"]');
    await t.click('.swal-button--confirm');
    await t.click('#close-button');

    await t.click('#staff-link');
  }
}

export const editStaff = new EditStaffForm();
