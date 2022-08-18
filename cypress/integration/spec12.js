/// <reference types="cypress" />

it('does not call API until 60 seconds passed', () => {
  // spy on the GET /fruit call and pass a cy.spy function
  cy.intercept('GET', '/fruit', cy.spy().as('getFruit'))
  // as the request handler. The callback function does nothing
  // but we can use it later (via an alias) to check how
  // many times it was called = how many times the network
  // call happened
  // see https://on.cypress.io/spy
  // see https://on.cypress.io/stubs-spies-and-clocks
  // freeze the clock
  cy.clock()
  // visit the page
  cy.visit('/')
  // get the spy via its alias and confirm it was called once
  cy.get('@getFruit')
    .should('have.been.calledOnce')
    // then reset the history of calls
    .invoke('resetHistory')
  // tick 59 seconds
  cy.tick(59_000)
  // confirm the spy was not executed = there were no network calls
  cy.get('@getFruit').should('not.be.called')
  // tick 1 second
  cy.tick(1_000)
  // confirm the spy was executed = there was a network call
  cy.get('@getFruit').should('have.been.calledOnce')
})
