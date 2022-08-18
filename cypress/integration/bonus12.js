/// <reference types="cypress" />

it('saves the intercepted network response', () => {
  let response
  // intercept the GET /fruit request
  // https://on.cypress.io/intercept
  // and print the server response using "cy.log" command
  // https://on.cypress.io/log
  cy.intercept('GET', '/fruit', (req) => {
    req.continue((res) => {
      response = res.body
    })
  }).as('fruits')
  //
  // visit the site using cy.visit("/")
  cy.visit('/')
  //
  // NOTE: you cannot use "cy" commands inside the
  // intercept route handler. Instead, save the response
  // in a local closure variable "response"
  // and wait for the network call to finish
  // then print the saved response using the "cy.log"
  // command and save it into a file "response.json"
  // https://on.cypress.io/writefile
  cy.wait('@fruits').then(() => {
    expect(response, 'got a response').to.be.an('object')
    cy.log(response)
    cy.writeFile('response.json', response)
  })
})
