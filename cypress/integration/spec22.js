/// <reference types="cypress" />

it('uses cy.wait vs cy.get to access the intercept', () => {
  // if you set up a network intercept, you can wait
  // for it to happen using cy.wait(alias)
  // if the call has already happened, you can get the intercept
  // using cy.get(alias)
  //
  cy.intercept('GET', '/fruit').as('fruit')
  // set up a network intercept GET /fruit
  // visit the page and get the fruit from the page
  // then get the intercept using cy.get(alias)
  // and confirm the response.body is { fruit }
  //
  cy.visit('/')
  cy.contains('#fruit', 'loading').should('not.exist')
  cy.get('@fruit')
    .its('response.body')
    .should('include.all.keys', 'fruit')
  // you can get the intercept again as many times as necessary
  // for example, use cy.get(alias) again to check the response status code
  cy.get('@fruit')
    .its('response')
    .should('have.a.property', 'statusCode', 200)
})
