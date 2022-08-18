/// <reference types="cypress" />

it('clearly shows the loading element', () => {
  // stub the network call the application makes
  // and delay returning the fruit by 2 seconds
  // https://on.cypress.io/intercept
  const fruit = 'Kiwi'
  cy.intercept('GET', '/fruit', (req) => {
    req.reply({
      body: { fruit },
      delay: 2000,
    })
  }).as('fruit')
  //
  // visit the page
  // https://on.cypress.io/visit
  cy.visit('/')
  //
  // check if the loading element is visible
  // and then does not exist
  // https://on.cypress.io/get
  // https://on.cypress.io/should
  cy.get('#fruit')
    .should('be.visible')
    .should('have.text', 'loading...')
  cy.get('#fruit').should('not.include.text', 'loading')
  //
  // confirm the displayed fruit
  // https://on.cypress.io/contains
  cy.contains('#fruit', fruit).should('be.visible')
})
