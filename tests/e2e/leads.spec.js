// @ts-check
const { test, expect } = require('@playwright/test');
const {faker} = require('@faker-js/faker')
const {LandingPage} = require('../pages/landingPage')
const {Toast} = require('../pages/components')

let landingPage
let toast

test.beforeEach(async({page})=>{
    landingPage = new LandingPage(page)
    toast = new Toast(page)
})


test('deve cadastrar um lead na tela de espera', async ({ page }) => {
  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(randomName, randomEmail)
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
});

test('não deve cadastrar um lead com cadastro já existente', async ({ page , request}) => {
  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()

const newLead = await request.post('http://localhost:3333/leads',{
    data: {
      name: randomName,
      email: randomEmail
    }          
  })

  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(randomName, randomEmail)
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.haveText(message)
});

test('nao deve cadastrar com um email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Lucas Marques', 'Lucas.yahoo.com')

  await landingPage.alertHaveText('Email incorreto')    
});


test('validar campo Nome obrigatorio', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'Lucas@yahoo.com')

  await landingPage.alertHaveText('Campo obrigatório')    
});


test('validar campo Email obrigatorio', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Lucas Marques', '')

  await landingPage.alertHaveText('Campo obrigatório')    
});


test('validar todos campos obrigatorios', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
      ])    // validar duas instancias diferentes recebendo/apresentando essa mesma mensagem. Sem dar erro de ambiguidade
});