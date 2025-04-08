const { expect } = require('@playwright/test');


export class MoviesPage {

    constructor(page) { this.page = page }

    async isLogged() {
        await this.page.waitForLoadState('networkidle') //garante que so vai passar para o prox step depois de todo trafico de rede ser finalizado
        await expect(this.page).toHaveURL(/.*admin/) //vai procurar que a palavra admin esteja em algum ponto da url        
    }


    async create(title, overview, company_id, release_year) {

        //        await this.page.locator('a[href*="register"]').click() -> asterisco = CONTEM
        //        await this.page.locator('a[href^="register"]').click() -> chapeuzinho = COMEÇA COM
        await this.page.locator('a[href$="register"]').click() // -> dollar = TERMINA COM

        await this.page.getByLabel('Titulo do filme').fill(title) //quando tem uma label onde a propriedade 'for' tem o mesmo valor que a propriedade id do elemento, pode usar esse metodo
        await this.page.getByLabel('Sinopse').fill(overview) //quando tem uma label onde a propriedade 'for' tem o mesmo valor que a propriedade id do elemento, pode usar esse metodo

        await this.page.locator('#select_company_id .react-select__indicator').click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: company_id})
            .click()


        await this.page.locator('#select_year .react-select__indicator').click()

        await this.page.locator('.react-select__option')
                .filter({ hasText: release_year})
                .click()
    }
}




