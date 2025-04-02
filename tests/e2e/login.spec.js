const { test, expect } = require('@playwright/test')
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


test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("admin@zombieplus.com", "pwd123")
    await moviesPage.isLogged();
})

test('nao deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("admin@zombieplus.com", "abd1234")
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)

})

test('nao deve logar quando o email incorreto', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("www.lucas.com.br", "abd1234")
    await loginPage.alertHaveText('Email incorreto')
})

test('nao deve logar quando o campo email não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("", "abd1234")
    await loginPage.alertHaveText('Campo obrigatório')
})

test('nao deve logar quando a senha não é preenchida', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("lucas@gmail.com", "")
    await loginPage.alertHaveText('Campo obrigatório')
})

test('nao deve logar quando nenhum campoo é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("", "")
    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})