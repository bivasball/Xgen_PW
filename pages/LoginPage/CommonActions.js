const { expect } = require("@playwright/test");

exports.CommonActions = class CommonActions {
  constructor(page) {
    this.page = page;
    this.source_connection =  this.page
    .getByRole("link", { name: "Source Connections Source" });

    this.SourcePage_Webtable = this.page.locator(
      `xpath=//div[contains(@class,'MuiDataGrid-virtualScrollerRenderZone')]/div`
    );
  }

  async waitTillSpinnerVanishes() {
    // Use Playwright locator for the spinner
    const spinner = this.page.locator(
      "//span[contains(@style,'react-spinners-RiseLoader-odd')]"
    );
    // Wait until the spinner is invisible
    await spinner.waitFor({ state: "hidden|detached" });
  }

  async isElementPresent(selector) {
    await this.source_connection.click();
  //await this.page.pause();
  await this.page.waitForTimeout(5000);

    try {
      const elementHandle = await this.page.$(selector);
      const isPresent = await this.page.evaluate((element) => {
        return element !== null;
      }, elementHandle);
      return isPresent;
    } catch (error) {
      console.error("Error checking element presence:", error);
      return false;
    }
  }
};
