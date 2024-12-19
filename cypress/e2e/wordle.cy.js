describe('Wordle Game Tests', () => {
  let guess;
  let failguess;
  let solution;

  before(() => {
    // Fetch and log the Wordle solution
    cy.getTodaysSolution().then((todaysSolution) => {
      solution = todaysSolution;
    });

    // Load fixture data
    cy.fixture('data').then((data) => {
      guess = data.word;
      failguess = data.failword;
    });
  });


  beforeEach(() => {
    cy.navigateToGame();
  });

  it('should have the correct number of rows', () => {
    cy.get('.Row-module_row__pwpBq').then(($rows) => {
      const rowCount = $rows.length;
      cy.log(`Number of rows: ${rowCount}`);
      cy.task('logMessage', `Number of rows: ${rowCount}`);
      expect(rowCount).to.equal(6);
    });
  });

  it('should have the correct number of tiles in each row', () => {
    cy.get('.Row-module_row__pwpBq').each(($row, index) => {
      cy.wrap($row)
        .find('[data-testid="tile"]')
        .then(($tiles) => {
          const tileCount = $tiles.length;
          cy.log(`Row ${index + 1} has ${tileCount} tiles.`);
          expect(tileCount).to.equal(5);
        });
    });
  });

  it('should receive an error when typing an invalid word as first guess', () => {
    cy.get('[data-testid="tile"]').first().click();
    cy.typeWord(failguess);
    cy.get('[role="group"][aria-label="Row 1"]')
      .should('have.class', 'Row-module_row__pwpBq Row-module_invalid__RNDXZ');
  });

  it('should enter guess into the first tile of the first row', () => {
    cy.typeWord(guess);
    cy.wait(5000);
    cy.checkButtonsState(guess);
  });

  it('should enter solution into the first tile of the first row', () => {
    cy.typeWord(solution);
    cy.checkButtonsState(solution);
  });

  after(() => {
    cy.clearCookies();
  });
});
