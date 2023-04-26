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

  async addTechEquipment(addNewTechEquipment) {
    await t.click(Selector('button').withText('Equipment'));
    await t.click(Selector('#add-tech-equipment'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM}`).exists).ok();

    const selectRoom = Selector(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_ROOMS}`);
    const optionRoom = selectRoom.find('option');
    await t
      .click(selectRoom)
      .click(optionRoom.nth(7));

    await t.typeText(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_QUANTITY}`, addNewTechEquipment.quantity);

    await t.typeText(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_DESCRIPTION}`, addNewTechEquipment.description);

    await t.typeText(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_SERIALNUMBER}`, addNewTechEquipment.serialNumber);

    await t.typeText(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_ASSETTAG}`, addNewTechEquipment.assetTag);

    await t.click(Selector(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_SUBMIT}`));

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_TECH_EQUIPMENT_FORM_CLOSE_BUTTON}`);
  }

  async addTechJack(addNewTechJack) {
    await t.click(Selector('button').withText('Jacks'));
    await t.click(Selector('#add-jack'));
    await t.expect(Selector(`#${COMPONENT_IDS.ADD_JACK_FORM}`).exists).ok();

    const selectRoom = Selector(`#${COMPONENT_IDS.ADD_JACK_FORM_ROOMS}`);
    const optionRoom = selectRoom.find('option');
    await t
      .click(selectRoom)
      .click(optionRoom.nth(6));

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_JACKNUMBER}`, addNewTechJack.jackNumber);

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_WALLLOCATION}`, addNewTechJack.wallLocation);

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_IDFROOM}`, addNewTechJack.IDFRoom);

    await t.typeText(`#${COMPONENT_IDS.ADD_JACK_FORM_DESCRIPTION}`, addNewTechJack.description);

    await t.click(`#${COMPONENT_IDS.ADD_JACK_FORM_SUBMIT}`);

    await t.click(Selector('.swal-button--confirm'));

    await t.click(`#${COMPONENT_IDS.ADD_JACK_FORM_CLOSE_BUTTON}`);
  }
}

export const techPageComponents = new TechPage();
