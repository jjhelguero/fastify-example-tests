/// <reference types="cypress" />

it('shows the fruit returned from the test', () => {
  // stub the network call the application makes
  // to the server using "GET /fruit"
  // return "Kiwi" json object
  // tip: use https://on.cypress.io/intercept
  const fruit = 'Kiwi'
  cy.intercept('GET', '/fruit', { fruit }).as('getFruit')
  //
  // visit the page
  // https://on.cypress.io/visit
  cy.visit('/')
  //
  // wait for the app to make the network call
  // to make sure the stub was used
  // https://on.cypress.io/wait
  cy.wait('@getFruit')

  cy.contains('#fruit', fruit)
  //
  // confirm the application shows the fruit "Kiwi"
  // https://on.cypress.io/contains
})
