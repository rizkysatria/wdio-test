import { $, expect } from '@wdio/globals'

export class LoginScreen {

  static get onboardingTitle() {
    return $('android=new UiSelector().textContains("Selamat datang di Vello")')
  }

  static get onboardingSubTitle() {
    return $('android=new UiSelector().textContains("Nikmati kemudahan bertransaksi dengan aman dan cepat.")')
  }

  static get onboardingBtnMulai() {
    return $('android=new UiSelector().textContains("Mulai")')
  }

  static get btnDaftar() {
    return $('//*[@text="Daftar"]')
  }

  static get btnMasuk() {
    return $('//*[@text="Masuk"]')
  }

  static get usernameField() {
    return $(
      'android=new UiSelector()' +
      '.className("android.view.View")' +
      '.focusable(true)' +
      '.instance(0)'
    )
  }

  static get passwordField() {
    return $(
      'android=new UiSelector()' +
      '.className("android.view.View")' +
      '.focusable(true)' +
      '.instance(1)'
    )
  }

  static get loginBtnMasuk() {
    return $('//*[@text="Masuk"]')
  }

  static async inputUsername(userName: string): Promise<void> {
    const field = this.usernameField
    await field.waitForDisplayed({ timeout: 15000 })
    await field.click()
    await field.clearValue()
    await field.setValue(userName)
  }

  static async inputPassword(password: string): Promise<void> {
    const field = this.passwordField
    await field.waitForDisplayed({ timeout: 15000 })
    await field.click()
    await field.clearValue()
    await field.setValue(password)
  }

  private static async inputText(field: WebdriverIO.Element, value: string): Promise<void> {
  await field.waitForDisplayed({ timeout: 15000 })
  await field.click()
  await field.clearValue()
  await field.setValue(value)
}


  static async clickLogin(): Promise<void> {
    await this.loginBtnMasuk.waitForDisplayed({ timeout: 10000 })
    await this.loginBtnMasuk.click()
  }

  static async clickMulai(): Promise<void> {
    await this.onboardingBtnMulai.waitForDisplayed({ timeout: 10000 })
    await this.onboardingBtnMulai.click()
  }

  static async clickDaftar(): Promise<void> {
    await this.btnDaftar.waitForDisplayed({ timeout: 10000 })
    await this.btnDaftar.click()
  }

  static async clickMasuk(): Promise<void> {
    await this.btnMasuk.waitForDisplayed({ timeout: 10000 })
    await this.btnMasuk.click()
  } 

  static async verifyOnboardingTitle(): Promise<void> {
    await expect(this.onboardingTitle).toBeDisplayed()
    await expect(this.onboardingTitle)
      .toHaveText('Selamat datang di Vello')
  }

  static async verifyOnboardingSubTitle(): Promise<void> {
    await expect(this.onboardingSubTitle).toBeDisplayed()
    await expect(this.onboardingSubTitle)
      .toHaveText('Nikmati kemudahan bertransaksi dengan aman dan cepat.')
  }

}
