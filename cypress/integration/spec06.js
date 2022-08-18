/// <reference types="cypress" />

it('shows the loading element then fruit from a fixture', () => {
  // intercept the GET call to /fruit with fixture "apple.json"
  // https://on.cypress.io/intercept
  cy.intercept('GET', '/fruit', { fixture: 'apple.json' })
  //
  // visit the site
  // https://on.cypress.io/visit
  cy.visit('/')
  //
  // confirm the "loading..." text is shown
  // confirm the "apple" text is shown
  // https://on.cypress.io/contains
  cy.contains('#fruit', 'loading...').should('be.visible')
  cy.contains('#fruit', /apple/i).should('be.visible')
  cy.contains('loading...').should('not.exist')
  //
  // confirm there is no element with the text "loading..."
  // https://on.cypress.io/should
})
