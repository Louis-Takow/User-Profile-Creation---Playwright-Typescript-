import { Page } from '@playwright/test';

export class FormPage {
  private firstNameField;
  private lastNameField;
  private emailField;
  private passwordField;
  private confirmPasswordField;
  private genderMale;
  private genderFemale;
  private genderOther;
  private phoneNumberField;
  private linkedInField;
  private submitButton;
  private errorMessage;

  constructor(private page: Page) {
    // Initialize locators after the page is assigned
    this.firstNameField = page.locator('input#first-name');
    this.lastNameField = page.locator('input#last-name');
    this.emailField = page.locator('input#email');
    this.passwordField = page.locator('input#password');
    this.confirmPasswordField = page.locator('input#confirm-password');
    this.genderMale = page.locator('input#gender1');
    this.genderFemale = page.locator('input#gender2');
    this.genderOther = page.locator('input:has-text("Prefer not to say")');
    this.phoneNumberField = page.locator('input#phone-number');
    this.linkedInField = page.locator('input#linkedin-url');
    this.submitButton = page.locator('button:has-text("Submit")');
    this.errorMessage = page.locator('p'); // Assuming error messages use <p> tags
  }

  // Navigate to the form page
  async navigateToUrl() {
    await this.page.goto('/');
  }

  // Fill the form with details
  async fillForm(details: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender?: 'male' | 'female' | 'other';
    phoneNumber?: string;
    linkedIn?: string;
  }) {
    await this.firstNameField.fill(details.firstName);
    await this.lastNameField.fill(details.lastName);
    await this.emailField.fill(details.email);
    await this.passwordField.fill(details.password);
    await this.confirmPasswordField.fill(details.confirmPassword);

    if (details.gender) {
      const genderField =
        details.gender === 'male' ? this.genderMale :
        details.gender === 'female' ? this.genderFemale : this.genderOther;
      await genderField.check();
    }

    if (details.phoneNumber) await this.phoneNumberField.fill(details.phoneNumber);
    if (details.linkedIn) await this.linkedInField.fill(details.linkedIn);
  }

  // Submit the form
  async submitForm() {
    await this.submitButton.click();
  }

  // Get error message(s)
  async getErrorMessage() {
    return this.errorMessage.allTextContents();
  }
}