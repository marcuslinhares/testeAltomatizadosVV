// cypress/support/e2e.js ou cypress/support/index.js

// Ignorar erros específicos de "Chart is not defined"
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Chart is not defined')) {
      return false; // Impede o Cypress de falhar o teste
    }
    
    // Permitir outros erros não tratados
    return true;
  });
  