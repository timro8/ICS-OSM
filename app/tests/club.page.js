import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class ClubPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.CLUB}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async editClub(editClubCrendentials) {
    await t.click(`#${COMPONENT_IDS.EDIT_CLUB}`);
    await t.expect(Selector('#edit-club-modal').exists).ok();
    await t.typeText('#edit-club-name', editClubCrendentials.clubName, { replace: true });
    await t.typeText('#edit-club-description', editClubCrendentials.description, { replace: true });
    await t.typeText('#edit-club-joinLink', editClubCrendentials.joinLink, { replace: true });
    await t.typeText('#edit-club-meetingDay', editClubCrendentials.meetingDay, { replace: true });
    await t.typeText('#edit-club-meetingTime', editClubCrendentials.meetingTime, { replace: true });
    await t.typeText('#edit-club-meetingLocation', editClubCrendentials.meetingLocation, { replace: true });
    await t.typeText('#edit-club-advisor', editClubCrendentials.advisor, { replace: true });
  }

  async deleteClub() {
    await t.click('#delete-club-btn');
    await t.expect(Selector('#delete-club-modal').exists).ok();
    // await t.click(`#${COMPONENT_IDS.DELETE_CLUB}`);
  }
}

export const clubPage = new ClubPage();
