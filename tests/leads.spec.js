// @ts-check
const { test, expect } = require('@playwright/test');
const {LandingPage} = require('./pages/landingPage')

test('deve cadastrar um lead na tela de espera', async ({ page }) => {
  const landingPage = new LandingPage (page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Lucas Marques', 'Lucas@yahoo.com')
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toHaveText(message)

});


test('nao deve cadastrar com um email incorreto', async ({ page }) => {
  const landingPage = new LandingPage (page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Lucas Marques', 'Lucas.yahoo.com')

  await landingPage.alertHaveText('Email incorreto')    
});


test('validar campo Nome obrigatorio', async ({ page }) => {
  const landingPage = new LandingPage (page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'Lucas@yahoo.com')

  await landingPage.alertHaveText('Campo obrigatório')    
});


test('validar campo Email obrigatorio', async ({ page }) => {
  const landingPage = new LandingPage (page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Lucas Marques', '')

  await landingPage.alertHaveText('Campo obrigatório')    
});


test('validar todos campos obrigatorios', async ({ page }) => {
  const landingPage = new LandingPage (page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
      ])    // validar duas instancias diferentes recebendo/apresentando essa mesma mensagem. Sem dar erro de ambiguidade
});