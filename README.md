# Playwright Automation Exercise

This repository contains Login/purchase flow and API testing for the Automation Exercise, built using Playwright and TypeScript.

## 1. Prerequisites
Before you begin, ensure you have the following installed:
```
Node.js
Git
cursor or VScode
```

## 2. Clone the Repository
Get the latest code by cloning the repository to your local machine:

git clone https://github.com/hking144/TestExcersize.git
cd TestExcersize

## 3. Local Deployment
Install the project dependencies and the necessary browser binaries:
```
Install NPM packages
npm install
```
Install Playwright browsers (Chromium, Firefox, Webkit)
npx playwright install

## 4: Running the tests
With Playwright isntalled tests can be run via the green test run buttons in the code
<img width="504" height="133" alt="image" src="https://github.com/user-attachments/assets/06c267a2-11eb-4dd0-a0f1-c44f591ba492" />

the tests can also be run in terminal with the following commands:

UI tests
```
npx playwright test -g "Automation at cart register"
npx playwright test -g "Automation register first"
```
API tests
```
npx playwright test -g "Get User Good Creds"
npx playwright test -g "Get User Missing Creds"
npx playwright test -g "Get User Bad Creds"
npx playwright test -g "Delete User"
```
