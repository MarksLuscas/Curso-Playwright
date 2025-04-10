const { test, expect } = require('../support')
const { LoginPage } = require('../pages/loginPage')
const {Toast} = require('../pages/components')
const {MoviesPage} = require('../pages/MoviesPage')


test('deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.fillForms("admin@zombieplus.com", "pwd123")
    await page.movies.isLogged();
})

test('nao deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.fillForms("admin@zombieplus.com", "abd1234")
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)

})

test('nao deve logar quando o email incorreto', async ({ page }) => {
    await page.login.visit()
    await page.login.fillForms("www.lucas.com.br", "abd1234")
    await page.login.alertHaveText('Email incorreto')
})

test('nao deve logar quando o campo email não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.fillForms("", "abd1234")
    await page.login.alertHaveText('Campo obrigatório')
})

test('nao deve logar quando a senha não é preenchida', async ({ page }) => {
    await page.login.visit()
    await page.login.fillForms("lucas@gmail.com", "")
    await page.login.alertHaveText('Campo obrigatório')
})

test('nao deve logar quando nenhum campoo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.fillForms("", "")
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})