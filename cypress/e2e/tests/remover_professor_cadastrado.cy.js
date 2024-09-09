describe('Remoçao de Professor Cadastrado', () => {
  it('Deve permitir a remoçao do professor da base de dados', () => {
    // Acessar a página inicial 
    cy.visit('https://gestao-escolar.up.railway.app/')

    // Navegar para a página de login
    cy.get('.nav-link').click()

    // Preencher o campo de usuário
    cy.get('#username').type('teste')

    // Preencher o campo de senha
    cy.get('#password').type('testeuso')

    // Submeter o login
    cy.get('.btn').click()

    // Verificar se o login foi bem sucedido
    cy.url().should('include', 'secretaria/')

    // Navegar para a página de lista de professores  
    cy.get(':nth-child(4) > .nav-link').click()
    cy.get('[href="/professores/professores/"]').click()

    // Clicar em alterar 
    cy.get(':nth-child(3) > .row > .col-md-3 > .ml-2').click()

    // Selecionar a opção 'Apagar'
    cy.get('.ml-3').click()

    // Confirmar apagamento 
    cy.get('.button-del').click()
  })
})