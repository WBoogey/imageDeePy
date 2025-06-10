describe('Analyse d\'image', () => {
  it('Upload et analyse une image', () => {
    cy.loginByApi() // custom command à créer pour se connecter rapidement
    cy.visit('/Dashboard/analyser')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.jpg')
    cy.get('button').contains('Envoyer l\'image').click()
    cy.contains('Résultat de l\'analyse')
  })
})