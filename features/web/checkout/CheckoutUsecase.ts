import { CheckoutScreen } from './CheckoutScreen'

export class CheckoutUsecase {

    static async clickAddToCartProductList(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.buttonAddToCartProductList.click()
    }

    static async clickAddToCartProductDetail(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.buttonAddToCartProductDetail.click()
    }

    static async clickCart(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.buttonCart.click()
    }  
    
    static async clickItemSauceLabsOnesie(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.itemSauceLabsOnesie.click()
    }

    static async clickCheckout(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.buttonCheckout.click()
    }

    static async fillFormAndContinue(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.inputFirstName.setValue('test')
        await browser.pause(100) 
        await CheckoutScreen.inputLastName.setValue('test')
        await browser.pause(100) 
        await CheckoutScreen.inputPostalCode.setValue('12345')
        await browser.pause(100) 
        await CheckoutScreen.buttonContinue.click()
    }

    static async clickFinish(): Promise<void> {
        await browser.pause(500) 
        await CheckoutScreen.buttonFinish.click()
    }


}