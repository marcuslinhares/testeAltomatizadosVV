describe('Cadastro de Professores - Sistema Externo', () => {
  it('Deve permitir o login e cadastrar um novo professor com todos os campos obrigatorios', () => {

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
    cy.get('a[href="#collapseProfessores"]').click({ force: true }); // Força o clique se necessário
    cy.get('a[href="/professores/professor-novo/"]').first().click(); // Garante que apenas o primeiro elemento seja clicado

    // Preencher todos os campos obrigatórios
    cy.get('[required]').each(($el) => {
      const elementType = $el.attr('type');
      
      if (elementType === 'text' || elementType === 'email' || elementType === 'tel') {
        const placeholder = $el.attr('placeholder');
        if (placeholder === 'dd/mm/aaaa') {
          cy.wrap($el).type('01/01/2000'); // Exemplo de data, ajuste conforme necessário
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

    // Verificar se o cadastro foi bem-sucedido
    cy.contains('Professor cadastrado com sucesso').should('be.visible');
  });
});
