const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['list'], ['html'], ['github']],
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    trace: 'on',
  },
  webServer: {
    command: 'npx http-server . -p 3000',
    port: 3000,
    timeout: 120 * 1000, // 2 minutes
    reuseExistingServer: true,
  },
});