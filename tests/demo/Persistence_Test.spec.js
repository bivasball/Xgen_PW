import { test } from "@playwright/test";





test.only("To test the session ",async({browser})=>{
  const context = await browser.newContext({storageState:"user.json"});
  const page = await context.newPage();

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
  await page.waitForTimeout(10000);

});
