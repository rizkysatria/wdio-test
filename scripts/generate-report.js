const fs = require('fs');
const reporter = require('cucumber-html-reporter');

if (!fs.existsSync('reports/html')) {
  fs.mkdirSync('reports/html', { recursive: true });
}

const options = {
  theme: 'bootstrap',
  jsonDir: 'reports/json',
  output: 'reports/html/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false
};

reporter.generate(options);
