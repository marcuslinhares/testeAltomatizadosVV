describe('Cadastro de professor com registro duplicado', () => {
    it('Deve mostrar que o registro ja existe e nao realizar cadastro', () => {
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

      // Navegar para a página de cadastro de professores 
      cy.get(':nth-child(4) > .nav-link').click()
      cy.get('[href="/professores/professor-novo/"]').click()

      // Preencher todos os campos obrigatórios 
      cy.get('#professor_nome').type('Marcos Silva')
      cy.get('#professor_data_nascimento').type('03/05/1995')
      cy.get('#professor_situacao').select('3') // Selecionar a opção "Substituto" pelo valor '3'
      cy.get('#professor_situacao').should('have.value', '3') // Verificar se a opção correta foi selecionada
      cy.get('#professor_rg').type('12345')
      cy.get('#professor_sexo1').click()
      cy.get('#professor_logradouro_residencia').type('Sao Vicente')
      cy.get('#professor_numero_residencia').type('123')
      cy.get('#professor_bairro_residencia').type('Castilho França')
      cy.get('#professor_nivel_escolaridade').select('6') // Selecionar a opção "Ensino superior" pelo valor '6'
      cy.get('#professor_nivel_escolaridade').should('have.value', '6') // Verificar se a opção correta foi selecionada 

      // Salvar as alterações
      cy.contains('button', 'Salvar').click();
    })
  })