/// <reference types="cypress" />

it('hides server errors by returning stubbed response', () => {
  // intercept the GET /fruit call and
  // look at the server response
  // if the response code is not 200
  // use res.send to send back a test response
  // with status code 200 and body: { fruit: 'Mango' }
  //
  cy.intercept('GET', '/fruit', (req) => {
    req.continue((res) => {
      if (res.statusCode !== 200) {
        res.send({
          statusCode: 200,
          body: {
            fruit: 'Mango',
          },
        })
      }
    })
  })
  // set the intercept again to observe
  // the real server response, give it an alias "real"
  //
  cy.intercept('GET', '/fruit').as('real')
  // visit the site
  //
  cy.visit('/')
  // wait for the "real" intercept and look at the response
  // if the response is not 200
  //    the fruit "Mango" should be visible on the page
  // else
  //    the fruit from the server response
  //    should be visible
  cy.wait('@real')
    .its('response')
    .then((resp) => {
      if (resp.statusCode !== 200) {
        cy.log('There is a server error!')
        cy.contains('#fruit', 'Mango')
      } else {
        cy.contains('#fruit', resp.body.fruit)
      }
    })
})
