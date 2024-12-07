import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/login";
import { UploadCsvAndXlsxFile_Page } from "../../pages/SourcePage/UploadCsvAndXlsxFile_Page";

test("To upload file CSV file company_data", async ({ page }) => {
  test.slow();
  const Login = new LoginPage(page);
  const UploadCsvAndXlsx = new UploadCsvAndXlsxFile_Page(page);

  await test.step("Log in", async () => {
    await Login.gotoLoginPage();
    await Login.loginWithRole("", "", "");
  });

  await test.step("To upload CSV file", async () => {
    await UploadCsvAndXlsx.toUploadCsvFile(
      "COMPANY2",
      "Company Data2",
      "csv",
      "company_data.csv"
    );
  });

  await test.step("Log out", async () => {
    const Login = new LoginPage(page);
    await Login.logout();
  });
});

test("To upload XLSX file - CategoryForecast.xlsx ", async ({ page }) => {
  test.slow();
  const Login = new LoginPage(page);
  const UploadCsvAndXlsx = new UploadCsvAndXlsxFile_Page(page);

  await test.step("Log in", async () => {
    await Login.gotoLoginPage();
    await Login.loginWithRole("", "", "");
  });

  await test.step("To upload XLSX file", async () => {
    await UploadCsvAndXlsx.toUploadXlsxFile(
      "CATEGORY_FORECAST2",
      "Category Forecast Data",
      "excel",
      "CategoryForecast.xlsx"
    );
  });

  await test.step("Log out", async () => {
    const Login = new LoginPage(page);
    await Login.logout();
  });
});


test("To upload XLSX file - Company Survey.xlsx ", async ({ page }) => {
  test.slow();
  const Login = new LoginPage(page);
  const UploadCsvAndXlsx = new UploadCsvAndXlsxFile_Page(page);

  await test.step("Log in", async () => {
    await Login.gotoLoginPage();
    await Login.loginWithRole("", "", "");
  });

  await test.step("To upload XLSX file", async () => {
    await UploadCsvAndXlsx.toUploadXlsxFile(
      "COMPANY_SURVEY",
      "Company Survey Data",
      "excel",
      "Company Survey.xlsx"
    );
  });

  await test.step("Log out", async () => {
    const Login = new LoginPage(page);
    await Login.logout();
  });
});
