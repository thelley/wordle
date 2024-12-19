const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.nytimes.com/games/wordle/index.html',
    setupNodeEvents(on, config) {
      on('task', {
        logMessage(message) {
          console.log(message);
          return null;
        },
      });

      // Use Mochawesome reporter
      config.reporter = 'mochawesome';
      config.reporterOptions = {
        reportDir: 'cypress/results',  // Path where the results are stored
        overwrite: true,
        html: false,  // Disable HTML report generation
        json: true,   // Enable JSON report generation
      };

      return config;
    },
  },
});
