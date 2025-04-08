const { expect } = require('@playwright/test');

export class Toast{

  constructor(page){this.page = page}

    async containText(message){
        const toast = this.page.locator('.toast')
        await expect(toast).toContainText(message)
        await expect(toast).not.toBeVisible({timeout:5000}) //o toBeVisible 'permite' que o elemento esteja no html mas so nao estjea aparecendo
    }
}

