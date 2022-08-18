/// <reference types="cypress" />

it('fetches 10 fruits from the server', () => {
  // spy on the GET /fruit network call
  // and store each received fruit in a list
  // https://on.cypress.io/intercept
  const fruits = []
  cy.intercept('GET', '/fruit', (req) => {
    req.continue((res) => {
      fruits.push(res.body.fruit)
    })
  })
  //
  // freeze the clock before visiting the page
  // https://on.cypress.io/clock
  cy.clock()
  cy.visit('/')
  //
  // confirm there is one fruit in the list after loading the page
  cy.wrap(fruits).should('have.length', 1)

  //
  // advance the clock by 9 minutes
  // https://on.cypress.io/tick
  cy.tick(590_000)
  //
  // and confirm the list of fruits has 10 items
  // and it includes "Oranges"
  // https://on.cypress.io/wrap
  cy.wrap(fruits)
    .should('have.length', 10)
    .and('contain', 'Oranges')
})
