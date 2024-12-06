const { expect } = require("@playwright/test");
import { CommonActions } from "../LoginPage/CommonActions";

exports.UploadCsvAndXlsxFile_Page = class UploadCsvAndXlsxFile_Page {

  constructor(page) {
    this.page = page;
    this.CommonAct = new CommonActions(this.page);

    this.source_connection =  this.page
    .getByRole("link", { name: "Source Connections Source" });

  }


//------------------to upload file ------------------//


async toUploadCsvFile(sourceName,description,fileType,fileName){
await this.toUploadFile(sourceName,description,fileType,fileName);
}

async toUploadXlsxFile(sourceName,description,fileType,fileName){
  await this.toUploadFile(sourceName,description,fileType,fileName);
  }



async toUploadFile(sourceName,description,fileType,fileName){
  await this.verifyIfCsvFileIsAlreadyPresentIfYesThenDelete22(sourceName,description);
  await this.page.waitForTimeout(1000);
  await this.page.getByRole('link', { name: 'Source Connections Source' }).click();
  await this.page.getByRole('button', { name: 'Upload File' }).click();
  //await this.page.getByLabel('Source Name *').fill('TTT');
  await this.page.getByLabel('Source Name *').fill(sourceName);
  await this.page.getByLabel('Source Description *').fill(description);
  await this.page.getByLabel('File Format').click();
  //await this.page.getByRole('option', { name: 'csv' }).click();
  await this.page.getByRole('option', { name: fileType }).click();
  //await this.page.locator(`xpath=//input[@id='upload-import-file']`).setInputFiles('./files/company_data.csv');
  let fileNm = './files/'+fileName;
  await this.page.locator(`xpath=//input[@id='upload-import-file']`).setInputFiles(fileNm);
  await this.page.waitForTimeout(1000);

  await this.page.getByRole('button', { name: 'Save' }).click();
  await this.page.waitForTimeout(5000);
  await this.page.waitForTimeout(5000);

}





async verifyIfCsvFileIsAlreadyPresentIfYesThenDelete22(nametoDelete,description){
  await this.page
  .getByRole("link", { name: "Source Connections Source" })
  .click();
await this.page.waitForTimeout(5000);
//const selector = "//p[normalize-space()='TTT']";
const selector = "//p[normalize-space()='"+nametoDelete+"']";
//console.log("The required -----",selector);
const sourceName = this.CommonAct.isElementPresent(selector);
if (await sourceName==true) {

  const name1 =  "File (CSV, JSON, Excel, Parquet) "+nametoDelete+" "+description+" No Tags Files File (CSV" ;

  await expect(this.page.getByRole('row', { name: name1 }).getByLabel('Delete Source').getByRole('button')).toBeVisible();
  await this.page.getByRole('row', { name: name1 }).getByLabel('Delete Source').getByRole('button').click();

  const name2 = "Confirm Deletion - "+nametoDelete+"";
    await expect(this.page.getByLabel(name2)).toContainText('Are you sure you want to delete source? This activity cannot be undone.');
  await expect(this.page.getByLabel(name2)).toContainText('Delete');
  await this.page.getByRole('button', { name: 'Delete' }).click();
  await this.page.getByRole('button', { name: 'Refresh' }).click();

} else {
  console.log("The element is not present and nothing to be deleted");
}

}


};
