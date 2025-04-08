const { test } = require('@playwright/test')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')
const { LoginPage } = require('../pages/loginPage')
const { Toast } = require('../pages/components')
const { MoviesPage } = require('../pages/MoviesPage')


let loginPage
let toast
let moviesPage

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})


test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create

    await executeSQL(`DELETE from movies where title = '${movie.title}'; `)

    await loginPage.visit()
    await loginPage.fillForms("admin@zombieplus.com", "pwd123")
    await moviesPage.isLogged()

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)


    await toast.containText('Cadastro realizado com sucesso!')

})