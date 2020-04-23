import { element, by, ElementFinder } from 'protractor';

export class FieldTestEnumWithValueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('my-prefix-field-test-enum-with-value div table .btn-danger'));
  title = element.all(by.css('my-prefix-field-test-enum-with-value div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class FieldTestEnumWithValueUpdatePage {
  pageTitle = element(by.id('my-prefix-field-test-enum-with-value-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  myFieldASelect = element(by.id('field_myFieldA'));
  myFieldBSelect = element(by.id('field_myFieldB'));
  myFieldCSelect = element(by.id('field_myFieldC'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMyFieldASelect(myFieldA: string): Promise<void> {
    await this.myFieldASelect.sendKeys(myFieldA);
  }

  async getMyFieldASelect(): Promise<string> {
    return await this.myFieldASelect.element(by.css('option:checked')).getText();
  }

  async myFieldASelectLastOption(): Promise<void> {
    await this.myFieldASelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMyFieldBSelect(myFieldB: string): Promise<void> {
    await this.myFieldBSelect.sendKeys(myFieldB);
  }

  async getMyFieldBSelect(): Promise<string> {
    return await this.myFieldBSelect.element(by.css('option:checked')).getText();
  }

  async myFieldBSelectLastOption(): Promise<void> {
    await this.myFieldBSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setMyFieldCSelect(myFieldC: string): Promise<void> {
    await this.myFieldCSelect.sendKeys(myFieldC);
  }

  async getMyFieldCSelect(): Promise<string> {
    return await this.myFieldCSelect.element(by.css('option:checked')).getText();
  }

  async myFieldCSelectLastOption(): Promise<void> {
    await this.myFieldCSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class FieldTestEnumWithValueDeleteDialog {
  private dialogTitle = element(by.id('my-prefix-delete-fieldTestEnumWithValue-heading'));
  private confirmButton = element(by.id('my-prefix-confirm-delete-fieldTestEnumWithValue'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
