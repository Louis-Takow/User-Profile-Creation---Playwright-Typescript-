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


});
