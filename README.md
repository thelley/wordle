This repository contains an automated Cypress testing framework to test the functionality of a Wordle game. The tests are designed to validate several aspects of the game, such as the number of rows, the number of tiles per row, word validation, and tile state transitions.

Requirements
Before running the tests, ensure that you have the following installed:

Node.js (version 14 or above)
Cypress (installed via npm)
Cypress plugins and custom commands
Installation
1. Clone the Repository
First, clone this repository to your local machine:

bash
Copy code
git clone https://github.com/your-username/wordle-cypress-tests.git
cd wordle-cypress-tests
2. Install Dependencies
Run the following command to install the necessary dependencies using npm:

bash
Copy code
npm install
This will install Cypress, any required plugins, and fixtures.

3. Configure Cypress
Make sure you configure your Cypress setup as needed. If you need to adjust the base URL or other settings, you can modify the cypress.json file or set the environment variables.

Project Structure
Here’s a quick overview of the project structure:

bash
Copy code
/wordle-cypress-tests
  /cypress
    /fixtures
      data.json        # Fixture data for test cases
    /integration
      wordle_spec.js   # Main test file
    /support
      commands.js      # Custom Cypress commands
      index.js         # Setup for global commands and hooks
  /node_modules         # Node modules
  cypress.json          # Cypress configuration file
  package.json          # npm package configuration
  README.md             # Project documentation
Custom Commands
The test suite uses custom Cypress commands defined in cypress/support/commands.js. These commands simplify the test code and provide reusable logic for typing words, checking button states, etc.

Fixtures
The cypress/fixtures/data.json file contains sample data for guesses, solutions, and failure cases. Modify this file to add different words for testing.

Running the Tests
You can run the tests either in the Cypress Test Runner UI or headlessly in the terminal.

Running in the Cypress Test Runner
To open the Cypress Test Runner UI, run the following command:

bash
Copy code
npx cypress open
This will open the Cypress interface where you can select individual tests to run interactively.

Running Tests Headlessly
To run the tests headlessly (without opening the Test Runner UI), use the following command:

bash
Copy code
npx cypress run
This will execute all tests and output the results in the terminal.

Test Output
The test results will be logged in the terminal. You will see whether each test passes or fails, along with any relevant logs or error messages.

Test Breakdown
Here's a breakdown of the main tests in wordle_spec.js:

1. Test Setup (before)
Fetches the Wordle solution for the day using a custom command cy.getTodaysSolution().
Loads fixture data (data.json) for valid and invalid guesses.
2. Test Cleanup (after)
Clears cookies after all tests have run.
3. Test Case 1: Correct Number of Rows
Verifies that there are exactly 6 rows in the Wordle game.
javascript
Copy code
it('should have the correct number of rows', () => {
  cy.get('.Row-module_row__pwpBq').then(($rows) => {
    const rowCount = $rows.length;
    expect(rowCount).to.equal(6);
  });
});
4. Test Case 2: Correct Number of Tiles per Row
Verifies that each row contains exactly 5 tiles.
javascript
Copy code
it('should have the correct number of tiles in each row', () => {
  cy.get('.Row-module_row__pwpBq').each(($row, index) => {
    cy.wrap($row)
      .find('[data-testid="tile"]')
      .should('have.length', 5);
  });
});
5. Test Case 3: Invalid Word Input
Ensures an error is displayed when an invalid word is entered as the first guess.
javascript
Copy code
it('should receive an error when typing an invalid word as first guess', () => {
  cy.get('[data-testid="tile"]').first().click();
  cy.typeWord(failguess);
  cy.get('[role="group"][aria-label="Row 1"]')
    .should('have.class', 'Row-module_invalid__RNDXZ');
});
6. Test Case 4: Entering a Guess
Tests that a valid guess can be entered and the correct button states are updated.
javascript
Copy code
it('should enter guess into the first tile of the first row', () => {
  cy.typeWord(guess);
  cy.checkButtonsState(guess);
});
7. Test Case 5: Entering the Correct Solution
Tests that the solution can be entered and the buttons reflect the correct state.
javascript
Copy code
it('should enter solution into the first tile of the first row', () => {
  cy.typeWord(solution);
  cy.checkButtonsState(solution);
});
Custom Commands
You can add and modify custom commands in cypress/support/commands.js. Here are some examples:

cy.typeWord(word): Types a word into the Wordle input tiles.
cy.checkButtonsState(word): Verifies that the button states match the expected states for a given word.
cy.getTodaysSolution(): Fetches the solution for today (you may need to implement this if it's a dynamic API call).
cy.navigateToGame(): Navigates to the Wordle game page.
Additional Notes
Modify cypress.json for specific configuration settings like base URL, environment variables, and more.
You can add additional tests in the wordle_spec.js file or create new test files for other features.
Conclusion
This Cypress test framework is designed to quickly validate the functionality of the Wordle game and ensure the game behaves as expected. You can extend and modify these tests to suit your needs.