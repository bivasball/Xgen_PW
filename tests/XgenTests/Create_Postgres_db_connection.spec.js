import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/login";
import { PostgresPage } from "../../pages/SourcePage/PostgresPage";

test("To create the PG database connection", async ({ page }) => {
  test.slow();

  await test.step('Log in', async () => {
    const Login = new LoginPage(page);
    await Login.gotoLoginPage();
    await Login.loginWithRole("","","");
  });

  await test.step('Re-Create Postgress Connection', async () => {
    const PostgresP = new PostgresPage(page);
    await PostgresP.createPostgresConnectionLatest();

  });

  await test.step('Log out', async () => {
    const Login = new LoginPage(page);
    await Login.logout();

  });


});
