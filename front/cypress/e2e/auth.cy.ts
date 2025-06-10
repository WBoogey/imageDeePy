describe('Authentification', () => {
  it('Inscription et connexion', () => {
    cy.visit('/auth/register')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="email"]').type('testuser@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Dashboard')
    cy.contains('testuser')
    cy.get('button').contains('Se déconnecter').click()
    cy.url().should('include', '/auth/login')
  })
})