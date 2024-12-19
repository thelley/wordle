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
      return config;
    },
  },
});
