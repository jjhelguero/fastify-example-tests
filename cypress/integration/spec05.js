/// <reference types="cypress" />

it('shows a different fruit after reloading the page', () => {
  // visit the site using https://on.cypress.io/visit
  // grab the fruit name from the page
  // (make sure it is not "loading...")
  cy.visit('/')
  cy.get('#fruit')
    .should('not.include.text', 'loading...')
    .invoke('text')
    .then((fruit) => {
      // expect(fruit).not.have.text('loading...')
      cy.reload()
      cy.get('#fruit')
        .should('not.include.text', 'loading...')
        .and('not.include.text', fruit)
    })
  //
  // reload the page using https://on.cypress.io/reload
  // grab the fruit name from the page again
  // confirm the fruit name is different
  //
  // tip: use nested https://on.cypress.io/then callbacks
})
