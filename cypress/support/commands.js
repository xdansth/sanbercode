Cypress.Commands.add('loginOrangeHRM', () => {
    cy.intercept('GET', '**/api/v2/dashboard/**').as('dashboard');
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait('@dashboard');
});