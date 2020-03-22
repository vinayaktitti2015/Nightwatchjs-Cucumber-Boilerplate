const { createSession, closeSession, startWebDriver, stopWebDriver, client} = require('nightwatch-api');
const fs = require('fs');
const { setDefaultTimeout, After, AfterAll, BeforeAll } = require('cucumber');
const reporter = require('cucumber-html-reporter');

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver();
  await createSession();
});

After(() => client.execute(`
  localStorage.clear();
  sessionStorage.clear();
`).deleteCookies().refresh());

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
  setTimeout(() => {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: 'report/cucumber_report.json',
      output: 'report/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
    });
  }, 1000);
});

