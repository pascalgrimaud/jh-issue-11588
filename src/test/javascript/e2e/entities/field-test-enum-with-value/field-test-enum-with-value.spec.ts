import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  FieldTestEnumWithValueComponentsPage,
  FieldTestEnumWithValueDeleteDialog,
  FieldTestEnumWithValueUpdatePage
} from './field-test-enum-with-value.page-object';

const expect = chai.expect;

describe('FieldTestEnumWithValue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fieldTestEnumWithValueComponentsPage: FieldTestEnumWithValueComponentsPage;
  let fieldTestEnumWithValueUpdatePage: FieldTestEnumWithValueUpdatePage;
  let fieldTestEnumWithValueDeleteDialog: FieldTestEnumWithValueDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FieldTestEnumWithValues', async () => {
    await navBarPage.goToEntity('field-test-enum-with-value');
    fieldTestEnumWithValueComponentsPage = new FieldTestEnumWithValueComponentsPage();
    await browser.wait(ec.visibilityOf(fieldTestEnumWithValueComponentsPage.title), 5000);
    expect(await fieldTestEnumWithValueComponentsPage.getTitle()).to.eq('sampleWebsocketApp.fieldTestEnumWithValue.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(fieldTestEnumWithValueComponentsPage.entities), ec.visibilityOf(fieldTestEnumWithValueComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FieldTestEnumWithValue page', async () => {
    await fieldTestEnumWithValueComponentsPage.clickOnCreateButton();
    fieldTestEnumWithValueUpdatePage = new FieldTestEnumWithValueUpdatePage();
    expect(await fieldTestEnumWithValueUpdatePage.getPageTitle()).to.eq('sampleWebsocketApp.fieldTestEnumWithValue.home.createOrEditLabel');
    await fieldTestEnumWithValueUpdatePage.cancel();
  });

  it('should create and save FieldTestEnumWithValues', async () => {
    const nbButtonsBeforeCreate = await fieldTestEnumWithValueComponentsPage.countDeleteButtons();

    await fieldTestEnumWithValueComponentsPage.clickOnCreateButton();

    await promise.all([
      fieldTestEnumWithValueUpdatePage.myFieldASelectLastOption(),
      fieldTestEnumWithValueUpdatePage.myFieldBSelectLastOption(),
      fieldTestEnumWithValueUpdatePage.myFieldCSelectLastOption()
    ]);

    await fieldTestEnumWithValueUpdatePage.save();
    expect(await fieldTestEnumWithValueUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fieldTestEnumWithValueComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last FieldTestEnumWithValue', async () => {
    const nbButtonsBeforeDelete = await fieldTestEnumWithValueComponentsPage.countDeleteButtons();
    await fieldTestEnumWithValueComponentsPage.clickOnLastDeleteButton();

    fieldTestEnumWithValueDeleteDialog = new FieldTestEnumWithValueDeleteDialog();
    expect(await fieldTestEnumWithValueDeleteDialog.getDialogTitle()).to.eq('sampleWebsocketApp.fieldTestEnumWithValue.delete.question');
    await fieldTestEnumWithValueDeleteDialog.clickOnConfirmButton();

    expect(await fieldTestEnumWithValueComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
