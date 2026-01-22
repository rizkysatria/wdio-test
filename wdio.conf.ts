import * as path from 'path'

export const config: WebdriverIO.Config = {

  /**
   * WEB SETUP
   */
  runner: 'local',
  framework: 'cucumber',
  baseUrl: 'https://www.saucedemo.com/',
  capabilities: [{ browserName: 'chrome' }], //WEB
  specs: ['./features/web/**/*.feature'], //WEB

  cucumberOpts: {
    require: ['./features/web/**/*.ts'],
    timeout: 60000
  },

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: false,
      disableWebdriverScreenshotsReporting: false,
    }]
  ],

  /**
   * SCREENSHOT AUTO SAAT FAIL (OPTIONAL TAPI DISARANKAN)
   */
  afterStep: async function (_step, _scenario, { error }) {
    if (error) {
      await browser.takeScreenshot()
    }
  },

  /**
   * MOBILE SETUP
   */
  // runner: 'local',
  // hostname: '127.0.0.1',
  // port: 4723,
  // path: '/',
  // framework: 'cucumber',
  // services: ['appium'], //MOBILE
  // capabilities: [
  //   {
  //     platformName: 'Android',
  //     'appium:automationName': 'UiAutomator2', 
  //     'appium:deviceName': 'Android Emulator',
  //     'appium:platformVersion': '14',
  //     'appium:app': path.join(
  //       process.cwd(),
  //       'apps',
  //       'android',
  //       'app-dev-debug.apk'
  //     ),
  //     'appium:autoGrantPermissions': true
  //   }
  // ],
  // specs: ['./features/**/*.feature'], //MOBILE

  // cucumberOpts: {
  //   require: ['./features/mobile/**/*.ts'],
  //   timeout: 60000
  // },

  // beforeScenario: async (world) => {
  //   if (world.pickle.tags.some((t) => t.name === '@reset')) {
  //     await driver.terminateApp('id.co.vello.dev')
  //     await driver.activateApp('id.co.vello.dev')
  //   }
  // }

}
