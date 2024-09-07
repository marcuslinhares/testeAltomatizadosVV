describe('Cadastro de Professores - Sistema Externo', () => {
    it('Deve mostrar erro ao tentar cadastrar um professor com data de nascimento futura', () => {
  
      // Visitar a página principal
      cy.visit('https://gestao-escolar.up.railway.app/');
  
      // Navegar para a página de login
      cy.get('a[href="/index-manager/"]').click();
  
      // Preencher o campo de usuário
      cy.get('input[name="username"]').type('teste'); // Substitua pelos dados de login
  
      // Preencher o campo de senha
      cy.get('input[name="password"]').type('testeuso'); // Substitua pelos dados de login
  
      // Submeter o formulário de login
      cy.get('button[type="submit"]').click();
  
      // Verificar se o login foi bem-sucedido
      cy.url().should('include', 'secretaria/');
  
      // Navegar para a página de cadastro de professores
      cy.get('a[href="#collapseProfessores"]').click({ force: true });
      cy.get('a[href="/professores/professor-novo/"]').first().click();
  
      // Preencher todos os campos obrigatórios
      cy.get('[required]').each(($el) => {
        const elementType = $el.attr('type');
  
        if (elementType === 'text' || elementType === 'email' || elementType === 'tel') {
          const placeholder = $el.attr('placeholder');
          if (placeholder === 'dd/mm/aaaa') {
            cy.wrap($el).type('01/01/2050'); // Exemplo de data futura para simular o erro
          } else {
            cy.wrap($el).type('Texto Padrão');
          }
        } else if (elementType === 'number') {
          cy.wrap($el).type('12345');
        } else if (elementType === 'checkbox' || elementType === 'radio') {
          cy.wrap($el).check();
        } else if ($el.is('select')) {
          cy.wrap($el).select($el.find('option').eq(1).val()); // Seleciona a segunda opção
        }
      });
  
      // Garantir que o botão "Salvar" esteja visível e então clicar
      cy.contains('button', 'Salvar').should('be.visible').click({ force: true });
  
      // Verificar que a mensagem de sucesso **não** aparece
      cy.contains('Professor cadastrado com sucesso').should('not.exist');
  
      // Opcional: Verificar que a mensagem de erro ou campo inválido está visível
      cy.get('input[placeholder="dd/mm/aaaa"]').then(($input) => {
        expect($input[0].validationMessage).to.not.equal('');
      });
  
    });
  });
  