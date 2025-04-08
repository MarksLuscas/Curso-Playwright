const { test } = require('@playwright/test')
const data = require('../support/fixtures/movies.json')
const { LoginPage } = require('../pages/loginPage')
const {Toast} = require('../pages/components')
const {MoviesPage} = require('../pages/MoviesPage')


let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})


test('deve poder cadastrar um novo filme', async ({page}) =>{

    const movie = data.create

    await loginPage.visit()
    await loginPage.fillForms("admin@zombieplus.com", "pwd123")
    await moviesPage.isLogged()

    await moviesPage.create()


    await Toast.containText('Cadastro realizado com sucesso!')

})