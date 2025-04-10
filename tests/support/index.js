const {test : base, expect} = require('@playwright/test')
const { LoginPage } = require('../pages/loginPage')
const { Toast } = require('../pages/components')
const { MoviesPage } = require('../pages/MoviesPage')
const {LandingPage} = require('../pages/landingPage')

const test = base.extend({
    page:async ({page}, use) =>{

        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['movies'] = new MoviesPage(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export{ test, expect }