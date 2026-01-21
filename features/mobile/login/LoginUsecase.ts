import { LoginScreen } from './LoginScreen'

export class LoginUsecase {

  static async verifySplashScreen() {
    await LoginScreen.verifyOnboardingTitle()
    await LoginScreen.verifyOnboardingSubTitle()
    await LoginScreen.clickMulai()
    await LoginScreen.clickMasuk()
    await LoginScreen.clickMasuk() 
  }

   static async onUserLogin(): Promise<void> {
    await LoginScreen.inputUsername('emilys')
    await LoginScreen.inputPassword('emilyspass')
    await LoginScreen.clickLogin()
  }

  static async verifyHomeScreen() {
    // await LoginScreen.assertHomeVisible()
  }
}
