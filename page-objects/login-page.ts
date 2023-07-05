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
  readonly getEmailInputToResetPassword: Locator;
  readonly getSendEmailButton: Locator;
  readonly getEmailSentMessage: Locator;
  readonly getStayLoggedInCheckbox: Locator;

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
    this.getEmailInputToResetPassword = page
      .locator("#forgotPasswordForm")
      .getByRole("textbox", {
        name: "E-Mail-Adresse*",
      });
    this.getSendEmailButton = page.getByRole("button", {
      name: "E-Mail absenden",
    });
    this.getEmailSentMessage = page.getByRole("heading", {
      name: "E-Mail verschickt",
    });
    this.getStayLoggedInCheckbox = page.locator("#remember-me");
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
    await this.getAccountIcon.hover();
    await this.getLoginButton.click();
    await this.getLoginPageTitle.waitFor({ state: "visible" });
  }

  // Enter the email input field
  async enterEmailInput(email: string) {
    await this.getEmailInput.fill(email);
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

  // Verify the error message for empty password field
  async verifyErrorForEmptyPassword() {
    await this.getErrorMessageForRequiredField.nth(1);
  }

  // Verify the error message for empty details
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

  // Enter the email id for password reset
  async enterEmailIdForPasswordReset(email: string) {
    await this.getEmailInputToResetPassword.fill(email);
  }

  // Click Send Email button
  async clickSendEmailIdButton(email: string) {
    await this.getSendEmailButton.click();
  }

  // Verify the "Email sent" message
  async verifyEmailSentMessage() {
    await this.getEmailSentMessage.isVisible();
  }

  // Verify the error message for empty email field
  async verifyErrorForInvalidEmailFormat() {
    await this.getErrorMessageForRequiredField
      .getByText("Ungültige E-Mail-Adresse")
      .isVisible();
  }

  // Verify the error message for empty email field
  async verifyErrorMessageDisappeared() {
    const isVisible = await this.getErrorMessageForRequiredField.isVisible();
    expect(isVisible).toBe(false);
  }

  // Check the stay loggedIn checkbox
  async checkStayLoggedIn() {
    await this.getStayLoggedInCheckbox.check();
  }

  // Verify the value of rememberMe from local storage
  async verifyRememberMe() {
    // Access localStorage within the page context
    const rememberMe = await this.page.evaluate(() =>
      localStorage.getItem("rememberMe")
    );
    await expect(rememberMe).toBe("true");
  }
}
