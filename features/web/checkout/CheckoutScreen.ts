export class CheckoutScreen {
    static get buttonAddToCartProductList() {
        return $('#add-to-cart-sauce-labs-backpack')
    }

    static get buttonAddToCartProductDetail() {
        return $('#add-to-cart')
    }

    static get buttonRemoveFromCart() {
        return $('#remove-sauce-labs-backpack')
    }

    static get buttonCart() {
        return $('[data-test="shopping-cart-link"]')
    }

    static get itemSauceLabsOnesie() {
        return $('#item_4_title_link')
    }

    static get buttonCheckout() {
        return $('#checkout')
    }
    static get buttonContinue() {
        return $('#continue')
    }
    static get buttonFinish() {
        return $('#finish')
    }
    static get buttonBackToProducts() {
        return $('#back-to-products')
    }

    static get inputFirstName() {
        return $('#first-name')
    }

    static get inputLastName() {
        return $('#last-name')
    }

    static get inputPostalCode() {
        return $('#postal-code')
    }

}



