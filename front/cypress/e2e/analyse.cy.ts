describe('Analyse d\'image', () => {
  it('Upload et analyse une image', () => {
    cy.loginByApi()
    cy.visit('/Dashboard/analyser')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/1.jpg', { force: true })
    cy.get('button').contains('Envoyer l\'image').click()
    cy.contains('Résultat de l\'analyse')
  })
})