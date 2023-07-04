import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly getAllowCookiesButton: Locator;
  readonly getAccountIcon: Locator;
  readonly getLoginPageTitle: Locator;
  readonly getEmailInput: Locator;
  readonly getPasswordInput: Locator;
  readonly getLoginButton: Locator;
  readonly getAccountLogIn: Locator;
  readonly getErrorMessageForRequiredField: Locator;
  readonly getErrorMessageForInvalidDetails: Locator;
  readonly getErrorMessageForEmptyDetails: Locator;
  readonly getForgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators for different elements on the page
    this.getAllowCookiesButton = page.locator("button", {
      hasText: "Alle erlauben",
    });
    this.getAccountIcon = page.locator(".header-component__button");
    this.getLoginPageTitle = page.getByRole("heading", {
      name: "Willkommen bei Douglas",
    });
    this.getEmailInput = page.locator('input[name="email"]').first();
    this.getPasswordInput = page
      .locator("#loginForm")
      .getByPlaceholder("Passwort*");
    this.getLoginButton = page
      .getByRole("button", { name: "Anmelden" })
      .first();
    this.getAccountLogIn = page.locator("svg.account-flyout__status");
    this.getErrorMessageForRequiredField = page
      .locator("#loginForm")
      .locator(".input_error");
    this.getErrorMessageForEmptyDetails = page
      .getByTestId("alert-list")
      .getByText("Bitte überprüfe deine Angaben");
    this.getErrorMessageForInvalidDetails = page
      .getByTestId("container")
      .locator("div")
      .filter({ hasText: "Falsche Zugangsdaten" })
      .nth(3);
    this.getForgotPasswordLink = page
      .locator("#loginForm")
      .getByText("Passwort vergessen?");
  }

  // Go to the URL of the page
  async gotoURL() {
    await this.page.goto("/");
  }

  // Click on the allow cookies button
  async clickAllowCookiesButton() {
    await this.getAllowCookiesButton.waitFor({ state: "visible" });
    await this.getAllowCookiesButton.click();
  }

  // Click on the account icon to open the login page
  async clickAccountIcon() {
    await this.getAccountIcon.isVisible();
    await this.getAccountIcon.click();
    await this.getLoginPageTitle.waitFor({ state: "visible" });
  }

  // Enter the email input field
  async enterEmailInput(username: string) {
    await this.getEmailInput.fill(username);
  }

  // Enter the password input field
  async enterPasswordInput(password: string) {
    await this.getPasswordInput.fill(password);
  }

  // Click on the login button
  async clickLoginButton() {
    await this.getLoginButton.click();
  }

  // Verify that the login was successful
  async verifyLogin() {
    await this.getAccountLogIn.waitFor({ state: "attached" });
    await expect(this.getAccountLogIn).toBeAttached();
  }

  // Verify the error message for empty email field
  async verifyErrorForEmptyEmail() {
    await this.getErrorMessageForRequiredField.first();
  }

  async verifyErrorForEmptyPassword() {
    await this.getErrorMessageForRequiredField.nth(1);
  }

  // Verify the error message for empty password field
  async verifyErrorForEmptyDetails() {
    await this.getErrorMessageForEmptyDetails.isVisible();
  }

  // Verify the error message for empty details
  async verifyErrorMessageForInvalidDetails() {
    await this.getErrorMessageForInvalidDetails.isVisible();
  }

  // Click on forgot password link
  async clickForgotPasswordLink() {
    await this.getForgotPasswordLink.click();
  }
}
