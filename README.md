
# Playwright Login Flow Test Automation

## Overview

This project contains Playwright automated tests for a Single Page Application login flow.  
The goal is to verify the login functionality, UI elements visibility after login, logout behavior,  
and handle negative login scenarios with invalid credentials.

During the assessment, it is assumed that the application is developed and working as expected.  
For example, navigation buttons are clickable but do not redirect anywhere yet, so it is assumed that  
the redirection functionality will be implemented in future sprints.  

Similarly, for invalid credentials, it would be better to show an error message like "Login or password is not correct,"  
but this is also considered a potential enhancement for upcoming sprints.

---

## Test Scope

- **Positive login tests** for multiple valid users loaded from `validUsers.json`.
- **UI validation tests** verifying content paragraphs, navigation buttons, and background image appear correctly after login.
- **Logout test** confirming the user can successfully log out and is returned to the login screen.
- **Negative login tests** for multiple invalid users loaded from `notValidUsers.json`, verifying login is rejected.
- **End-to-End Test** end-to-end login and logout flow test(s), verifying the full user journey from logging in through logging out.

---

## Project Structure

/tests
  ├── loginFlow.spec.js       # Main test suite with modular tests and data-driven loops
  └── e2e.spec.js             # End-to-end login and logout flow tests
/utils
  └── helpers.js              # Helper functions: login, logout
/testData
  ├── validUsers.json         # Valid user credentials
  └── notValidUsers.json      # Invalid user credentials
/playwright.config.js         # Playwright config including baseURL, webServer, and reporter setup

---

## Running Tests

1. Install dependencies:

npm install

2. Run tests with the local server started automatically:

npx playwright test

3. Open HTML report after test completion:

npx playwright show-report
