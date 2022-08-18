/// <reference types="cypress" />

it('modifies the HTML responses', () => {
  cy.intercept('/', (req) => {
    req.continue((res) => {
      res.body = res.body.replace('random', 'good')
    })
  })
  // intercept the HTML document "/"
  // and change the response body by replacing a word
  // confirm the new word is shown on the page
  cy.visit('/')
  cy.contains('a good fruit')
})
