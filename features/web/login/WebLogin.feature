@SmokeTest @Login
Feature: Login ke web

        Scenario: Login  berhasil
            Given User berada di halaman login
             When User login dengan id dan password yang valid
             Then User berhasil login dan masuk ke Beranda
