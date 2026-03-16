# Playwright UI and API Automation Assignment

This project contains automated tests implemented using Playwright.

## UI Automation

Automates the DemoQA Book Store Application.

Steps covered:
- Navigate to https://demoqa.com
- Login with an existing user
- Validate username and logout button
- Navigate to Book Store
- Search for "Learning JavaScript Design Patterns"
- Validate the search result
- Capture Title, Author and Publisher
- Save book details to a file
- Logout

## API Automation

Automates ReqRes API.

Steps covered:
- Create a user
- Validate response status code
- Store userId from response
- Get user details
- Update user name
- Validate updated response

## Run the Tests

Install dependencies:

npm install

Run tests:

npx playwright test --project=chromium

View report:

npx playwright show-report

## Test Execution Screenshots

Screenshots of successful test execution are available in the screenshots folder.