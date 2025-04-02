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

    async isLogged(){
        const logoutLink = this.page.locator('a[href="/logout"]')
        await expect(logoutLink).toBeVisible()
    }

}