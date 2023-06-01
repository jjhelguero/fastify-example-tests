/// <reference types="cypress" />

beforeEach(()=> {
  // intercept all requests and let them continue
  // going to the server. When the server replies,
  // check the response status code. It should be below 400.
  // https://on.cypress.io/intercept
  cy.intercept('*', (req) => {
    req.continue((res) => {
      const msg = `${req.url} ${res.statusCode}`
      if( res.statusCode >= 400) {
        throw new Error(msg)
      }
    })
  })
})

// finish implementing and refactoring this test
it('successfully completes every network request', () => {
  // visit the page "/bundles.html" and see if the test fails
  // https://on.cypress.io/visit
  cy.visit('/bundles.html')
})
