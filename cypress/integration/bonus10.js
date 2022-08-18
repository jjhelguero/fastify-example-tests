/// <reference types="cypress" />

it('sets a common header on all requests', () => {
  // create a random number between 1e5 and 1e6
  // using Cypress._.random function
  const randomNumber = Cypress._.random(1e5, 1e6)
  const requestId = `request-${randomNumber}`
  //
  // intercept all requests and add a custom header
  // https://on.cypress.io/intercept
  cy.intercept('*', (req) => {
    req.headers['request-id'] = requestId
  })
  //
  // set the header "request-id"
  // it will be used by our Fastify server
  // to log the requests
  //
  // also intercept the document or style or Ajax requests
  // and give them an alias to wait later
  cy.intercept('GET', '/').as('doc')
  cy.intercept('GET', '/fruit').as('fruit')
  //
  // visit the page using https://on.cypress.io/visit
  cy.visit('/')
  //
  // wait for the observed request(s)
  // and confirm the response header "x-request-id"
  // sent by the server back is the same as our
  // request ID we set above
  const aliases = ['@doc', '@fruit']
  aliases.forEach((alias) => {
    cy.wait(alias)
      .its('response.headers')
      .should('have.property', 'x-request-id', requestId)
  })
})
