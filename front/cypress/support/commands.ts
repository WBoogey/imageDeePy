/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('username', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       username(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Déclare la commande personnalisée pour TypeScript
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(): Chainable<void>
      registerByApi(username: string, email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginByApi', () => {
  cy.request('POST', 'http://localhost:8001/users/signin', {
    email: 'ehourayvannakora@gmail.com',
    password: 'thegreat01'
  }).then((response) => {
    window.localStorage.setItem('jwt', response.body.jwt)
    cy.setCookie('jwt', response.body.jwt)
  })
})

Cypress.Commands.add('registerByApi', (username: string, email: string, password: string) => {
  cy.request('POST', 'http://localhost:8001/users/register', {
    username,
    email,
    password
  }).then((response) => {
    window.localStorage.setItem('jwt', response.body.jwt)
    cy.setCookie('jwt', response.body.jwt)
  })
})

export {}
