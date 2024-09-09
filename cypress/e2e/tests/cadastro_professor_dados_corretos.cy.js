describe('Cadastro de Professor com dados corretos', () => {
    it('Deve permitir o cadastro do professor', () => {
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
      cy.get('#professor_nome').type('Laura Souza')
      cy.get('#professor_data_nascimento').type('15/03/1985')
      cy.get('#professor_situacao').select('1') // Selecionar a opção "CLT" pelo valor '1'
      cy.get('#professor_situacao').should('have.value', '1') // Verificar se a opção correta foi selecionada 
      cy.get('#professor_cpf').type('32466178932')
      cy.get('#professor_rg').type('54321')
      cy.get('#professor_sexo2').click()
      cy.get('#professor_estado_nascimento').select('PA') // Selecionar a opção "Pará" pelo valor 'PA'
      cy.get('#professor_estado_nascimento').should('have.value', 'PA') // Verificar se a opção correta foi selecionada 
      cy.get('#professor_municipio_nascimento').type('Dom Eliseu')
      cy.get('#professor_logradouro_residencia').type('Praças de Belem')
      cy.get('#professor_numero_residencia').type('521')
      cy.get('#professor_bairro_residencia').type('Cidade Velha')
      cy.get('#professor_ddd').type('91')
      cy.get('#professor_telefone').type('985439612')
      cy.get('#professor_email').type('laurasouzaprof@gmail.com')
      cy.get('#professor_filiacao1').click()
      cy.get('#professor_nivel_escolaridade').select('6') // Selecionar a opção "Ensino superior" pelo valor '6'
      cy.get('#professor_nivel_escolaridade').should('have.value', '6') // Verificar se a opção correta foi selecionada 
      cy.get('#professor_curso1').select('225H01') // Selecionar a opção "História -- Bacharelado" pelo valor '225H01'
      cy.get('#professor_curso1').should('have.value', '225H01') // Verificar se a opção correta foi selecionada 
      cy.get('#professor_curso_conclusao1').type('2014')
      cy.get('#professor_curso_instituicao1').type('UFC')
      cy.get('#professor_curso_publica1').click()
      cy.get('#professor_pos_graduacao_concluida2').click()

       // Salvar as alterações
      cy.contains('button', 'Salvar').click();
    })
  })