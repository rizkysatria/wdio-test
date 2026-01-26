import { Given, When, Then } from '@wdio/cucumber-framework'
import { CheckoutUsecase } from './CheckoutUsecase'
import { WebLoginUsecase } from '../login/WebLoginUsecase'

Given('User berada di halaman product list', async () => {
    // await CheckoutUsecase.checkoutProduct()
    await WebLoginUsecase.verifyLoginScreen()
    await WebLoginUsecase.onUserLogin() 
})

When('User click add to cart button untuk produk Sauce Labs Onesie',async () => {
    await CheckoutUsecase.clickAddToCartProductList()
  }
)

When('User klik title Sauce Labs Onesie dan berada di halaman product detail',async () => {
    await CheckoutUsecase.clickItemSauceLabsOnesie()
  }
)

Given('User click add to cart button',async () => {
    await CheckoutUsecase.clickAddToCartProductDetail()
  }
)

Given('User click cart button',async () => {
    await CheckoutUsecase.clickCart()
  }
)
Given('User click button checkout',async () => {
    await CheckoutUsecase.clickCheckout()
  }
)
Given('User mengisi form dan click tombol continue',async () => {
    await CheckoutUsecase.fillFormAndContinue()
})

Given('user click button finish',async () => {
    await CheckoutUsecase.clickFinish()
})

Then('Checkout Complete page tampil', async () => {
    // await CheckoutUsecase.checkoutProduct()
  }
)   
