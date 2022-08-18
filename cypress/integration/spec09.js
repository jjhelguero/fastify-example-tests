/// <reference types="cypress" />

it('returns different fruits', () => {
  // stub the /fruit endpoint to return "apple" on the first visit
  // stub the /fruit endpoint to return "grapes" on the second visit
  // https://on.cypress.io/intercept with "times: *" option
  const apple = 'apple'
  const grapes = 'grapes'
  cy.intercept(
    {
      method: 'GET',
      url: '/fruit',
      times: 1,
    },
    { fruit: grapes },
  )
  cy.intercept(
    {
      method: 'GET',
      url: '/fruit',
      times: 1,
    },
    { fruit: apple },
  )
  //
  // visit the site
  cy.visit('/')
  cy.contains('#fruit', apple)
  //
  // confirm it shows "apple"
  // reload the site
  // confirm it shows "grapes"
  cy.reload()
  cy.contains('#fruit', grapes)
})
