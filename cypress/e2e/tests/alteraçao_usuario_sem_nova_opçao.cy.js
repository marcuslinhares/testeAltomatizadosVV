describe('Alterar Tipo Usuario sem selecionar opçao valida', () => {
    it('Deve mostrar erro ao tentar alterar tipo usuario sem nova opçao', () => {
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

      // Navegar para a página de lista de usuários
      cy.get(':nth-child(11) > .nav-link').click()
      cy.get('[href="/usuarios/usuarios/"]').click()

      // Clicar em alterar usuário
      cy.get(':nth-child(1) > .head-card-min > .justify-content-end > .ml-2').click()

      // Selecionar a opção "valor vazio" pelo valor ''
      cy.get('#department').select('')
      
      // Verificar se a opção correta foi selecionada
      cy.get('#department').should('have.value', '')

      // Salvar as alterações
      cy.get('button[type="submit"].btn-dark-blue').click();
    })
  })