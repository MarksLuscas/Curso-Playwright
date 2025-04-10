const { test } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('deve poder cadastrar um novo filme', async ({ page }) => {

    const movie = data.create

    await executeSQL(`DELETE from movies where title = '${movie.title}'; `)

    await page.login.visit()
    await page.login.fillForms("admin@zombieplus.com", "pwd123")
    await page.movies.isLogged()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')
})