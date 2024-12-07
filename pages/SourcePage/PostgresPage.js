const { expect } = require("@playwright/test");
import { CommonActions } from "../LoginPage/CommonActions";

exports.PostgresPage = class PostgresPage {

  constructor(page) {
    this.page = page;
    this.CommonAct = new CommonActions(this.page);

    this.source_connection =  this.page
    .getByRole("link", { name: "Source Connections Source" });

  }




  async createPostgresConnection() {


    await this.verifyIfTheSourceIsAlreadyPresent();

    await this.page
      .getByRole("link", { name: "Source Connections Source" })
      .click();

    await this.page.getByRole("link", { name: "Add" }).click();
    await this.page.getByRole("button", { name: "Postgres" }).click();
    await this.page.getByLabel("Source Name *").fill("PG_SALES_DB");
    await this.page.getByLabel("Source Description *").fill("Pg sales db");
    await this.page
      .locator("#Input_L_1_host")
      .fill("xgen-dev.ckvh7cnonk8s.us-east-1.rds.amazonaws.com");
    await this.page.locator("#Input_L_1_database").fill("f1race");
    // to close the public //
    await this.page
      .locator(
        `xpath=//p[contains(text(),'Schemas')]/parent::div/following-sibling::div//*[@data-testid='CancelIcon']`
      )
      .click();
    await this.page.getByPlaceholder("Type and press enter...").fill("sales");
    await this.page.locator("#Input_L_1_username").fill("sa");
    await this.page.locator("#Input_L_1_password").fill("Spider20");
    await this.page.getByLabel("Scan Changes with User").check();
    await this.page.getByText("Create a SourceSrc Type:").click();
    await this.page.pause();
    await this.page.getByRole("button", { name: "Validate" }).click();
    //("Verify the Pop up success")
    const popup = this.page.locator(`xpath=//*[@id='1']/div[1]/div[2]/p`);
    await expect.soft(popup).toHaveText("Success");

    //"To verify the message 'Successfully connected to Source' after clicking on Validate Button"
    await expect.soft(
      this.page.locator(`xpath=//*[@id='1']/div[1]/div[2]/span`)
    ).toHaveText("Successfully connected to Source");

    await this.page.getByRole("button", { name: "Create" }).click();

    //"TO print the pop message 'Source PG_SALES_DB created with id' message"
    await expect.soft(
      this.page.locator(`xpath=//*[@id='2']/div[1]/div[2]/p`)
    ).toContainText("Source PG_SALES_DB created with id");

    await this.page.pause();
  }

  async verifyIfTheSourceIsAlreadyPresent() {
    await this.page
      .getByRole("link", { name: "Source Connections Source" })
      .click();
    //await this.page.pause();
    const selector = "//p[normalize-space()='PG_SALES_DB']";
    const sourceName = this.CommonAct.isElementPresent(selector);

    if (await sourceName==true) {
      console.log("It is visible");
      await this.page
        .getByRole("row", { name: "Postgres PG_SALES_DB Pg sales" })
        .getByLabel("Delete Source")
        .getByRole("button")
        .click();
      await this.page.getByText("Confirm Deletion - PG_SALES_DB").click();
      await this.page.getByRole("button", { name: "Delete" }).click();
      /*
      await expect(
        this.page.locator(`xpath=//p[@class='MuiTypography-root MuiTypography-body2 css-16kpwfw']`)
      ).toHaveText("Source deleted successfully");
        */
    } else {
      console.log("The element is not present and nothing to be deleted");
    }

   // await this.page.pause();
  }

  async verifySourceNameDisplayedInConnectSourcesTabList(sourceName) {
    await this.page
      .getByRole("link", { name: "Source Connections Source" })
      .click();

    await this.page.pause();
    //let flag = false;
    const elements = await this.page.locator(
      `xpath=//div[contains(@class,'MuiDataGrid-virtualScrollerRenderZone')]/div`
    );
    const numberOfRowsDisplayed = await elements.count();
    console.log("ROWS :- " + numberOfRowsDisplayed);

    const databasename = await this.page.locator(
      ".MuiTypography-root.MuiTypography-body1.css-1ls9q1i"
    );
    const databasenameText = await databasename.textContent();
    console.log("the username is ", databasenameText);
        return false;
  }


//------------------to new code to create PG database ------------------//
async createPostgresConnectionLatest() {


  await this.verifyIfTheSourceIsAlreadyPresent();

  await this.page
    .getByRole("link", { name: "Source Connections Source" })
    .click();

  await this.page.getByRole('link', { name: 'Add' }).click();
  await this.page.getByRole('button', { name: 'Postgres' }).click();
  await expect(this.page.getByText('Create a Source')).toBeVisible();

  await this.page.locator("xpath=//*[@data-testid='CancelIcon']").click();

  await this.page.getByLabel('Source Name *').fill('PG_SALES_DB');
  await this.page.getByLabel('Source Description *').fill('Pg sales db');
  await this.page.locator('#Input_L_1_host').fill('xgen-dev.ckvh7cnonk8s.us-east-1.rds.amazonaws.com');
  await this.page.locator('#Input_L_1_database').fill('f1race');

  await this.page.getByPlaceholder('Type and press enter...').fill('sales');
  await this.page.locator('#Input_L_1_username').fill('sa');
  await this.page.locator('#Input_L_1_password').fill('Spider20');
  await this.page.getByLabel('Scan Changes with User').check();

  await expect(this.page.getByRole('button', { name: 'Validate' })).toBeVisible();
  await expect(this.page.getByRole('button', { name: 'Create' })).toBeVisible();
  await expect(this.page.getByRole('button', { name: 'Close' })).toBeVisible();
  await this.page.getByRole('button', { name: 'Validate' }).click();

  await this.page.getByRole('button', { name: 'Create' }).click();
  await this.page.waitForTimeout(3000);
  await this.page.getByRole('button', { name: 'Refresh' }).click();

  await this.page.waitForTimeout(5000);
  await expect(this.page.getByText('PG_SALES_DB')).toBeVisible();


}







};
