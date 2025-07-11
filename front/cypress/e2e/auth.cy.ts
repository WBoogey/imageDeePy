describe('Authentification', () => {
  it('Inscription et connexion', () => {
    cy.visit('/auth/register')
    cy.get('input[name="username"]').type('testuser')
    cy.get('input[name="email"]').type('testuser@example2.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    const username = 'testuser'
    const email = `testuser${Date.now()}@example.com`
    const password = 'password123'
    cy.registerByApi(username, email, password)
    cy.visit('/Dashboard/analyser')
    cy.url({ timeout: 50000 }).should('include', '/Dashboard/analyser')
    cy.contains('Invité(e)')
    cy.wait(3000)
    cy.get('button').contains('Se déconnecter').click()
    cy.visit('/auth/login')
    cy.url({ timeout: 50000 }).should('include', '/auth/login')
  })
})