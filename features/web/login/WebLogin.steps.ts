import { Given, When, Then } from '@wdio/cucumber-framework'
import { WebLoginUsecase } from './WebLoginUsecase'

Given('User berada di halaman login', async () => {
  await WebLoginUsecase.verifyLoginScreen()
})

When('User login dengan id dan password yang valid',async () => {
    await WebLoginUsecase.onUserLogin()
  }
)

Then('User berhasil login dan masuk ke Beranda',
  async () => {
    await WebLoginUsecase.verifyHomeScreen()
  }
)