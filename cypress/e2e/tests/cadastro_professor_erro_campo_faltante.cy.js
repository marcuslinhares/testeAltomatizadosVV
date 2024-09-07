describe('Cadastro de Professores - Sistema Externo', () => {
  it('Deve exibir mensagem de erro ao tentar cadastrar um professor com o campo Nome faltando', () => {
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

    // Preencher todos os campos obrigatórios exceto o campo de nome
    cy.get('[required]').each(($el) => {
      const elementType = $el.attr('type');
      
      if (elementType === 'text' || elementType === 'email' || elementType === 'tel') {
        const placeholder = $el.attr('placeholder');
        if (placeholder === 'dd/mm/aaaa') {
          cy.wrap($el).type('01/01/2000'); // Exemplo de data, ajuste conforme necessário
        } else if ($el.attr('name') !== 'professor_nome') { // Deixa o campo de nome em branco
          cy.wrap($el).type('Texto Padrão');
        }
      } else if (elementType === 'number') {
        if ($el.attr('name') !== 'professor_nome') { // Deixa o campo de nome em branco
          cy.wrap($el).type('12345');
        }
      } else if (elementType === 'checkbox' || elementType === 'radio') {
        if ($el.attr('name') !== 'professor_nome') { // Deixa o campo de nome em branco
          cy.wrap($el).check();
        }
      } else if ($el.is('select')) {
        if ($el.attr('name') !== 'professor_nome') { // Deixa o campo de nome em branco
          cy.wrap($el).select($el.find('option').eq(1).val()); // Seleciona a segunda opção
        }
      }
    });

    // Garantir que o botão "Salvar" esteja visível e então clicar
    cy.contains('button', 'Salvar').should('be.visible').click({ force: true });

    // Verificar se a mensagem de erro para o campo Nome obrigatório aparece
    cy.get('p.errorlist')
      .should('exist')
      .should('not.be.empty')
      .and('have.css', 'display', 'block')
      .and('have.css', 'height').and('be.greaterThan', '0')
      .and('have.css', 'width').and('be.greaterThan', '0')
      .should('contain.text', 'Preencha este campo.'); // Ajuste o texto conforme necessário
  });
});
