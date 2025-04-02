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
        await this.page.waitForLoadState('networkidle') //garante que so vai passar para o prox step depois de todo trafico de rede ser finalizado
        await expect(this.page).toHaveURL(/.*admin/) //vai procurar que a palavra admin esteja em algum ponto da url        
    }
}