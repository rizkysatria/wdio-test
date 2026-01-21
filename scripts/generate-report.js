const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonDir: 'reports/json',
  output: 'reports/html/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    "Test Type": "Automation",
    "Environment": "R&D",
    "Browser": "Chrome",
    "Executed By": "Jenkins"
  }
};

reporter.generate(options);
