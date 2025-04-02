const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/loginPage')
const {Toast} = require('../pages/components')

let loginPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
})


test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("admin@zombieplus.com", "pwd123")
    await loginPage.isLogged();
})


test('nao deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.fillForms("admin@zombieplus.com", "abd1234")
    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(message)

})