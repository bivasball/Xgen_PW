const {chromium, expect} =require("@playwright/test");

module.exports = async config =>{
const browser = await chromium.launch({headless:false});
const page = await browser.newPage();
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
await page.getByPlaceholder('username').click();
await page.getByPlaceholder('username').fill('admin');
await page.getByPlaceholder('password').click();
await page.getByPlaceholder('password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();




//---------------//
await page.context().storageState({path:"user.json"});
await browser.close();


}