Cypress.Commands.add('navigateToGame', () => {
    cy.visit('/');
    cy.get('.purr-blocker-card__button').click();
    cy.get('[data-testid="Play"]').click();
    cy.get('[data-testid="icon-close"]').click();
  });
  
Cypress.Commands.add('typeWord', (word) => {
    cy.wait(1000)
    cy.get('[data-testid="tile"]')
      .first()
      .click();
  
    [...word].forEach((char) => {
      cy.get('[data-testid="tile"]')
        .first()
        .trigger('keydown', { key: char, code: `Key${char.toUpperCase()}`, which: char.charCodeAt(0) });
    });
  
    cy.get('[data-testid="tile"]')
      .first()
      .trigger('keydown', { key: 'Enter', code: 'Enter', which: 13 });
  });

Cypress.Commands.add('checkButtonsState', (letters) => {
    // Ensure the input is a string
    if (typeof letters !== 'string') {
      throw new Error('Input must be a string');
    }
  
    [...letters].forEach((letter) => {
      const key = letter.toLowerCase();
  
      cy.get(`button[data-key="${key}"]`)
      .should('have.attr', 'data-state')
      .and('match', /^(absent|correct|present)$/);
        });
    });

Cypress.Commands.add('getFormattedDate', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
    });
      
Cypress.Commands.add('getTodaysSolution', () => {
    return cy.getFormattedDate().then((formattedDate) => {
        return cy
        .intercept('GET', `https://www.nytimes.com/svc/wordle/v2/${formattedDate}.json`, (req) => {
            req.continue((res) => {
                const solution = res.body.solution;
                return solution;
            });
        })
        .as('wordleJson')
        .then(() => {
            cy.visit('https://www.nytimes.com/games/wordle/index.html');
            return cy.wait('@wordleJson').then((interception) => {
            const solution = interception.response.body.solution;
            cy.wrap(solution);
            });
        });
    });
});

  
  