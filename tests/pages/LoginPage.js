const { expect } = require('@playwright/test');


export class LoginPage {

    constructor(page) { this.page = page }

    async visit() {
        await this.page.goto('localhost:3000/admin/login')
        const login = this.page.locator('.login-form')
        await expect(login).toBeVisible()
    }

    async fillForms(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)

        await this.page.getByText('Entrar').click()
    }

    async alertHaveText(text){
        const alert = this.page.locator('span[class$=alert]') //busca alguma classe que tenha o texto alert em alguma parte dela
        await expect(alert).toHaveText(text)
    }
}