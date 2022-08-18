/// <reference types="cypress" />

it('simulates the error status code', () => {
  cy.intercept('GET', '/fruit', {
    statusCode: 404,
  })
  cy.visit('/')
  cy.contains('#fruit', 'HTTP error 404')
  // intercept the GET /fruit call and
  // return a response with status code 404
  // https://on.cypress.io/intercept
  //
  // visit the site
  //
  // confirm the page has an element with text "HTTP error 404"
})
