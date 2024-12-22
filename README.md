# Cypress Test Framework for Wordle

This repository contains an automated Cypress testing framework to test the functionality of a Wordle game. The tests are designed to validate several aspects of the game, such as the number of rows, the number of tiles per row, word validation, and tile state transitions.

## 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/thelley/wordle.git
cd wordle
```

## 2. Install Dependencies

Run the following command to install the necessary dependencies using npm:

```bash
npm install
```

## 3. Test Running Options

To open the Cypress Test Runner UI, run the following command:

```bash
npx cypress open
```
To run the tests headlessly (without opening the Test Runner UI), use the following command:

```bash
npx cypress run
```

## 4. Test Output

The test results will be logged in the terminal. You will see whether each test passes or fails, along with any relevant logs or error messages.

## 5. Test Breakdown

Here's a breakdown of the main tests in wordle.cy.js:

* Test Case 1: Correct Number of Rows
* Test Case 2: Correct Number of Tiles per Row
* Test Case 3: Invalid Word Input
* Test Case 4: Entering a Guess
* Test Case 5: Entering the Correct Solution

## 6. Future Improvements

* Breaking out tests into individual files as more tests are added. For example, creating a file just for structure (rows/columns/titles).
* adding more data-driven tests to Invalid guesses and Valid guesses. Changing data.json to contain an array of guesses would allow us to loop through multiple guesses.
* Adding more verbose logging.
* Adding more specific Assertions as test cases grow.
* Adding more test cases for edge cases.
* Most importantly, now that we can enter words and identify the states of the letters (correct, absent, present) we can make progress toward a wordle solver. 

cy.typeWord(word): Types a word into the Wordle input tiles.
cy.checkButtonsState(word): Verifies that the button states match the expected states for a given word.
cy.getTodaysSolution(): Fetches the solution for today (you may need to implement this if it's a dynamic API call).
cy.navigateToGame(): Navigates to the Wordle game page.
Additional Notes
Modify cypress.json for specific configuration settings like base URL, environment variables, and more.
You can add additional tests in the wordle_spec.js file or create new test files for other features.
Conclusion
This Cypress test framework is designed to quickly validate the functionality of the Wordle game and ensure the game behaves as expected. You can extend and modify these tests to suit your needs.