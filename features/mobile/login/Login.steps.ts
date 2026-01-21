import { Given, When, Then } from '@wdio/cucumber-framework'
import { LoginUsecase } from './LoginUsecase'

Given('User berada di splash screen', async () => {
  await LoginUsecase.verifySplashScreen()
})

When('User login dengan password akun konvensional yang valid',async () => {
    await LoginUsecase.onUserLogin()
  }
)

When('User login dengan password akun syariah yang valid',async () => {
    await LoginUsecase.onUserLogin()
  }
)

Then(
  'User berhasil login dan masuk ke Beranda',
  async () => {
    await LoginUsecase.verifyHomeScreen()
  }
)
