// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na tela de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click() // -> dessa forma o localizador está buscando algum botao que tenha Aperte o play em algum texto dele
//  await page.getByRole('button', {name: "Aperte o play"}).click()  -> dessa forma o localizador está buscando algum botao que tenha esse EXATO texto
//  await page.locator('#name').fill('marques@yahoo.com') -> busca pelo id
   
  expect(page.getByTestId('modal')
            .getByRole('heading')).toHaveText('Fila de espera')

  await page.locator('input[name=name]').fill('Lucas')
  await page.getByPlaceholder('Seu email principal').fill('lucas@yahooo.com') // -> ja busca direto pelo valor de placeholder


  await page.getByTestId('modal')
      .getByText('Quero entrar na fila!').click()

/* 
  await page.getByText('Seus dados conosco').click()
  const content = await page.content()
  console.log(content) 

    estrategia para conseguir validar o elemento que aparece na tela de forma muito rapida, pegando o conteudo html da pagina no momento que esse elemento aparece
*/ 

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator('.toast')).toHaveText(message)


  await expect(page.locator('.toast')).toBeHidden({timeout:5000}) // elemento tem até 5seg para ficar invisivel
});
