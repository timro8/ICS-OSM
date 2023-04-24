import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class TechPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.TECH}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    const waitTime = 1;
    await t.wait(waitTime * 1).expect(this.pageSelector.exists).ok();
  }

  async addJack() {
    await t.click(`#${COMPONENT_IDS.ADD_TECH_JACK}`);
    await t.expect(Selector('#tech-add-jack').exists).ok();
  }

  async editJack() {
    await t.click(`#${COMPONENT_IDS.EDIT_TECH_JACK}`);
    await t.expect(Selector('#edit-tech-jack').exists).ok();
  }

  async addEquipment() {
    await t.pressKey('#equip-tab');
    await t.click(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT}`);
    await t.expect(Selector('#tech-add-equip').exists).ok();
  }

}

export const techPage = new TechPage();
