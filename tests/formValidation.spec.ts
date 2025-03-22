import { test, expect } from '@playwright/test';
import { FormPage } from '../Pages/FormPage';

// Grouping all form validation tests under a single describe block
test.describe('Form Validation Tests', () => {
  let formPage: FormPage;  // Variable to hold the FormPage object

  // Run before each test: initializes the FormPage object and navigates to the URL
  test.beforeEach(async ({ page }) => {
    formPage = new FormPage(page);  // Initialize the FormPage with the page context
    await formPage.navigateToUrl();  // Navigate to the form URL
  });

  // Test Case 1: Verify form submission without any input values
  test('TC-001: Verify form submission without inputs', async () => {
    await formPage.submitForm();  // Submit the form with no inputs
    const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
    expect(errorMessage).toContain('Please fill in this field');  // Check if the error message matches the expected one
  });

  // Test Case 2: Validate first name field for invalid input (non-alphabetical characters)
  test('TC-002: Validate first name field for invalid input', async () => {
    // Fill the form with invalid first name, valid other fields
    await formPage.fillForm({
      firstName: '123@#%',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password',
      confirmPassword: 'Password'
    });
    await formPage.submitForm();  // Submit the form
    const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
    expect(errorMessage).toContain('This field must contain only letters');  // Check if the first name field validation message appears
  });

    // Test Case 3: Validate email field for invalid email formats
    test('TC-003: Validate email field for invalid formats', async () => {
      // Fill the form with an invalid email format
      await formPage.fillForm({
        firstName: 'John',
        lastName: 'Doe',
        email: 'abc@',
        password: 'Password',
        confirmPassword: 'Password'
      });
      await formPage.submitForm();  // Submit the form
      const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
      expect(errorMessage).toContain('Email is not valid');  // Verify the email error message
    });
  
    // Test Case 4: Validate password fields for matching values
  test('TC-004: Validate password matching', async () => {
    // Fill the form with mismatched password and confirm password
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password456'
    });
    await formPage.submitForm();  // Submit the form
    const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
    expect(errorMessage).toContain('The password fields must match');  // Verify that the password match error appears
  });

  // Test Case 5: Validate gender selection functionality
  test('TC-005: Validate gender selection functionality', async () => {
    // Fill the form with a selected gender
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      gender: 'male'
    });
    await formPage.submitForm();  // Submit the form
  });

  // Test Case 6: Validate phone number field for invalid input (non-numerical characters)
  test('TC-006: Validate phone number field for invalid input', async () => {
    // Fill the form with an invalid phone number
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      phoneNumber: 'abc123'
    });
    await formPage.submitForm();  // Submit the form
    const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
    expect(errorMessage).toContain('Phone number must contain just numerical characters');  // Verify the phone number error
  });

  // Test Case 7: Validate LinkedIn URL field for invalid URLs
  test('TC-007: Validate LinkedIn URL field for invalid URLs', async () => {
    // Fill the form with an invalid LinkedIn URL
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      linkedIn: 'example'
    });
    await formPage.submitForm();  // Submit the form
    const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
    expect(errorMessage).toContain('Please enter a valid URL');  // Verify the URL error message
  });

  // Test Case 8: Test form submission with all valid inputs
  test('TC-008: Test form submission with valid inputs', async ({page}) => {
    // Fill the form with valid input values
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123',
      gender: 'male',
      phoneNumber: '1234567890',
      linkedIn: 'https://linkedin.com/in/johndoe'
    });
    await formPage.submitForm();  // Submit the form
  });

  // Test Case 9: Validate form submission with only mandatory fields
  test('TC-009: Validate submission with mandatory fields only', async ({page}) => {
    // Fill the form with only the mandatory fields
    await formPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    });
    await formPage.submitForm();  // Submit the form
  });

  // Test Case 10: Validate form submission with one mandatory field missing
  test('TC-010: Validate submission with one mandatory field missing', async () => {
    // Fill the form with a missing first name
    await formPage.fillForm({
      firstName: '',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      confirmPassword: 'Password123'
    });
    await formPage.submitForm();  // Submit the form
    const errorMessage = await formPage.getErrorMessage();  // Retrieve the error message
    expect(errorMessage).toContain('Please fill in this field');  // Verify that the missing field error appears
  }); 
});
