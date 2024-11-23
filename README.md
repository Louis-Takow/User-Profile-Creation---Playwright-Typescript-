# User-Profile-Creation---Playwright-Typescript

This repository contains automated tests for a user profile creation form using Playwright and TypeScript. It validates various form fields to ensure proper input handling.


## Prerequisites

- **Node.js**: Ensure that you have the latest version installed. Download it from [Node.js](https://nodejs.org/).
- **Playwright**: The Playwright testing framework is used to automate browser actions. Learn more at [Playwright](https://playwright.dev/).
- **IDE**: It is recommended to use **Visual Studio Code** for development.

## Setup Instructions

1. **Clone this repository** using your preferred command line tool:

   ```bash
   git clone <repository-url>
   cd User-Profile-Creation---Playwright-Typescript-
   ```

2. **Install dependencies** and Playwright:

   ```bash
   npm install
   ```
3. **Configuration**
Base URL: Configured in playwright.config.ts.

## Test Suite
The formValidation.spec.ts file includes tests for:
- Submitting forms with missing/invalid inputs
- Validating fields like first name, email, password, phone number, and LinkedIn URL
- Ensuring successful form submission with valid inputs

## CI/CD with GitHub Actions
The repository is configured with a CI/CD pipeline using GitHub Actions to run Playwright tests automatically on every push. See .github/workflows/test.yml.

## Running Tests Locally
To run tests locally:
- **Headless mode**
   ```bash
      Copy code
      npx playwright test tests/formValidation.spec.ts
   ```
- **Headed mode**
  ```bash
     Copy code
     npx playwright test --ui
  ```

## Custom Scripts
- **Run form validation tests and open playwright reporter**
  ```bash
     npm test test:formValidation
  ```

## Best Practices
- **Page Object Model (POM)**: This design pattern enhances test maintainability and readability by separating page-specific actions into dedicated classes.
- **Separation of Concerns**: Tests focus on a single piece of functionality, making them easier to understand, debug, and maintain.
- **Data Management**: A base URL is defined in playwright.config.ts for reusablity and maintance overhead
- **Modular Test Design**: Grouped related tests using test.describe for clarity and maintainability.
- **Test Setup**: Used beforeEach for initializing the test environment to avoid duplication.
- **Automation**: Integrated CI/CD using GitHub Actions for continuous testing.
- **Test Reporting**: Automatically opens Playwright's HTML report after running tests.
