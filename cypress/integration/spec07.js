/// <reference types="cypress" />

it('uses the fixture to stub and check the page', () => {
  // load the data from the fixture file "apple.json"
  // using the command https://on.cypress.io/fixture
  cy.fixture('apple.json').then((data) => {
    cy.intercept('GET', '/fruit', { fixture: 'apple.json' })
    cy.visit('/')
    cy.contains('#fruit', data.fruit).should('be.visible')
  })
  // intercept the GET call to /fruit with fixture "apple.json"
  // https://on.cypress.io/intercept
  //
  // visit the site
  // https://on.cypress.io/visit
  //
  // confirm the fruit from the fixture is shown on the page
  // https://on.cypress.io/contains
})
