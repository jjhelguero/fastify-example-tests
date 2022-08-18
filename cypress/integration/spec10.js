/// <reference types="cypress" />

it('shows the loading element with Promise.delay', () => {
  // set up an intercept to spy on the GET /fruit endpoint
  // but delay the request by 2 seconds using
  // Cypress.Promise.delay(2000) and the response function
  // hint: see https://on.cypress.io/intercept and
  // the response callback function
  cy.intercept('GET', '/fruit', (req) => {
    req.on('response', (res) => {
      return Cypress.Promise.delay(2000)
    })
  }).as('getFruit')
  // visit the site
  cy.visit('/')
  // make sure the loading element is visible
  cy.contains('#fruit', /loading/i)
  // from the request spy, get the response body
  cy.wait('@getFruit')
    .its('response.body.fruit')
    .then((fruit) => {
      cy.contains('#fruit', fruit).should('be.visible')
    })
  // and confirm the fruit returned by the server is visible
})
