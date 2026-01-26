@Checkout
Feature: Checkout

        Scenario: checkout dari product list
            Given User berada di halaman product list
             When User click add to cart button untuk produk Sauce Labs Onesie
              And User click cart button
              And User click button checkout
              And User mengisi form dan click tombol continue
              And user click button finish
             Then Checkout Complete page tampil


        Scenario: checkout dari product detail
            Given User berada di halaman product list
             When User klik title Sauce Labs Onesie dan berada di halaman product detail
              And User click add to cart button
              And User click cart button
              And User click button checkout
              And User mengisi form dan click tombol continue
              And user click button finish
             Then Checkout Complete page tampil
