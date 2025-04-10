const { test, expect } = require('../support')
const {faker} = require('@faker-js/faker')

const {Toast} = require('../pages/components')



test('deve cadastrar um lead na tela de espera', async ({ page }) => {
  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(randomName, randomEmail)
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)
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

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(randomName, randomEmail)
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});


test('nao deve cadastrar com um email incorreto', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Lucas Marques', 'Lucas.yahoo.com')

  await page.landing.alertHaveText('Email incorreto')    
});


test('validar campo Nome obrigatorio', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'Lucas@yahoo.com')

  await page.landing.alertHaveText('Campo obrigatório')    
});


test('validar campo Email obrigatorio', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Lucas Marques', '')

  await page.landing.alertHaveText('Campo obrigatório')    
});


test('validar todos campos obrigatorios', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
      ])    // validar duas instancias diferentes recebendo/apresentando essa mesma mensagem. Sem dar erro de ambiguidade
});