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
});
