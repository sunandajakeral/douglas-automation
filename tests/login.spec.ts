import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login-page";
import {testData} from "../support/testdata";

test.describe("Login to the Application", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    // Go to the website
    await loginPage.gotoURL();

    // Accept cookie permissions
    await loginPage.clickAllowCookiesButton();

    // Expect a title to be like ".* DOUGLAS"
    await expect(page).toHaveTitle(/.*DOUGLAS/);

    // Navigate to Login page
    await loginPage.clickAccountIcon();
  });

  test("successful login", async () => {
    /**
     * Enters a valid email id and a valid password
     */
    await loginPage.enterEmailInput(testData.email);
    await loginPage.enterPasswordInput(testData.password);
    await loginPage.clickLoginButton();
    await loginPage.verifyLogin();
  });

  test("login with empty credentials", async () => {
    /**
     *  Does not enter any values for email and password
     *  and tries to login
     * */
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorForEmptyEmail();
    await loginPage.verifyErrorForEmptyPassword();
    await loginPage.verifyErrorForEmptyDetails();
  });

  test("login with invalid credentials", async () => {
    /**
     * Enters a valid email id and an invalid password
     */
    await loginPage.enterEmailInput("sunandajakeral@gmail.com");
    await loginPage.enterPasswordInput("**");
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessageForInvalidDetails();
  });

  test("login with valid email id and empty password", async () => {
    /**
     * Enters a valid email id and empty password
     */
    await loginPage.enterEmailInput("sunandajakeral@gmail.com");
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorMessageForInvalidDetails();
    await loginPage.verifyErrorForEmptyDetails();
    await loginPage.verifyErrorForEmptyPassword();
  });

  test("reset password", async () => {
    /**
     * Enters a valid registered email id to receive password reset link
     */
    await loginPage.clickForgotPasswordLink();
    await loginPage.enterEmailIdForPasswordReset(testData.email);
    await loginPage.clickSendEmailIdButton();
    await loginPage.verifyEmailSentMessage();
  });

  test("login with email having invalid format", async () => {
    /**
     * Enters a invalid email and any password
     */
    await loginPage.enterEmailInput("testgmail.com");
    await loginPage.enterPasswordInput("password");
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorForInvalidEmailFormat();
  });

  test("error message disappears when valid email is entered", async () => {
    /**
     * Enters a invalid email and any password
     */
    await loginPage.enterEmailInput("testgmail.com");
    await loginPage.enterPasswordInput("password");
    await loginPage.clickLoginButton();
    await loginPage.verifyErrorForInvalidEmailFormat();

    // Entering the correct Email ID clears the error message
    await loginPage.enterEmailInput(testData.email);
    await loginPage.verifyErrorMessageDisappeared();
  });
  
  test("stay loggedIn after successful login", async () => {
    /**
     * Stay loggedin after successful login 
     */
    await loginPage.enterEmailInput(testData.email);
    await loginPage.enterPasswordInput(testData.password);
    await loginPage.checkStayLoggedIn();
    await loginPage.clickLoginButton();
    await loginPage.verifyLogin();
    await loginPage.verifyRememberMe();
  });
});
