const { expect } = require('@playwright/test');


export class MoviesPage{
    
    constructor(page) { this.page = page }

    async isLogged(){
        await this.page.waitForLoadState('networkidle') //garante que so vai passar para o prox step depois de todo trafico de rede ser finalizado
        await expect(this.page).toHaveURL(/.*admin/) //vai procurar que a palavra admin esteja em algum ponto da url        
    }
}




