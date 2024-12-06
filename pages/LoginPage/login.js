import * as userdata from "../../TestData/Url_login.json";
const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {

    constructor(page) {

        this.page = page
        this.username_textbox = page.getByLabel('Username *')
        this.password_textbox = page.getByLabel('Password *')
        this.login_button = page.getByRole('button', { name: 'Login' })
        this.role_dropdown = page.getByLabel('', { exact: true })
        this.select_role_from_dropdown = page.getByRole('option', { name: 'TEST_AUTOMATE' })
        this.logout_element = page.getByLabel('Logout').getByRole('button')
    }

    async gotoLoginPage(){
       // console.log("The user data is ",userdata[0].url);
        await this.page.goto(userdata[0].url);
        //await this.page.goto("http://xgendemo.uxli.com")
    }



    async loginWithRole(username, password,role){
        await this.username_textbox.fill(userdata[0].loginuser);
        await this.password_textbox.fill(userdata[0].loginPassword);
        await this.login_button.click();

        await expect(this.page.getByText('User Authentication Successful')).toBeVisible();

        //click the dropdown of for role select
        await this.role_dropdown.click()
        //select the role
        let roleR = userdata[0].role;

        this.page.getByRole('option', { name: roleR }).click();


        await expect(this.page.getByRole('heading', { name: 'Welcome, Automation!' })).toBeVisible();
        await expect(this.page.getByText('Automation User')).toBeVisible();
    }


    async logout(){
        await this.page.waitForTimeout(1000);
        await this.logout_element.click();
        await this.page.waitForTimeout(1000);


    }
}


