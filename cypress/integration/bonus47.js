/// <reference types="cypress" />

it('shows the returned JSONP response', () => {
  // intercept the GET requests to "/api-jsonp" endpoint
  // that looks like /api-jsonp?callback=...
  // https://on.cypress.io/intercept
  cy.intercept('/api-jsonp*',(req) => {
    req.continue((res) => {
      console.log(res.body)
    })
  }).as('jsonp')
  //
  // let the request continue going to the server
  // and print the response body to show it is a string
  // show the response from the server
  // which is something like "callbackName(list)"
  // give the call an alias "jsonp"
  //
  // visit the "/jsonp.html" page
  // and confirm the call "jsonp" has happened
  cy.visit('/jsonp.html')
  cy.wait('@jsonp')
  //
  // confirm there are two items shown in the list of names
  cy.get('li').should('have.length',2)
})

it('stubs a JSONP call', () => {
  const testData = [
    {
      name: 'Cy',
    },
  ]
  // intercept the ajax calls to the "/api-json" endpoint
  //
   cy.intercept({
    method: 'GET', 
    pathname: '/api-jsonp'
   }, (req) => {
      const callbackName = req.query.callback
      if (!callbackName) {
        console.error(req.query)
        throw new Error('Missing the JSONP callback name')
      }
      req.reply({
        headers: {
          'content-type': 'application/x-javascript; charset=utf-8',
        },
        body:
          callbackName +
          '(' +
          JSON.stringify(testData) +
          ')',
      })
   }).as('jsonp')
  // see the entire object of parameters
  // console.log(req.query)
  // look at the request object
  // grab the callback name from the request query object
  // if there is no callback name, throw an error
  cy.visit('/jsonp.html')
  cy.wait('@jsonp')

  cy.get('li').should('have.length', 1).first().should('have.text', 'Cy')
  //
  // reply with a JavaScript snippet
  // that calls the function name set by the user
  // and includes the JSON object testData
  // Tip: make sure to set the appropriate "content-type" header
  //
  // give the call an alias "jsonp"
  //
  // and confirm the call "jsonp" has happened
  // confirm the only item in the list has the text "Cy"
})
