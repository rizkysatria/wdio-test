import { WebLoginScreen } from './WebLoginScreen'

export class WebLoginUsecase {

  static async verifyLoginScreen() {
    await browser.url('/')
    await browser.pause(5000) 
  }

   static async onUserLogin(): Promise<void> {
    await WebLoginScreen.textFieldUserName.setValue('standard_user')
    await WebLoginScreen.textFieldPassword.setValue('secret_sauce')
    await WebLoginScreen.buttonLogin.click()
    await browser.pause(10000) 
  }

  static async verifyHomeScreen() {
    // await LoginScreen.assertHomeVisible()
  }
}
