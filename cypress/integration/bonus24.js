/// <reference types="cypress" />

/**
 * Ping the given URL recursively until it responds,
 * or we run out of attempts.
 * @param {string} url - The URL to ping.
 * @param {number} n - The number of attempts to make, 3 by default
 */
function pingPage(url, n = 3) {
  // if the number of attempts is negative
  // throw an error - we tried and tried and tried
  // but the URL never successfully loaded
  if (n < 0) {
    throw new error('server no good =/')
  }
  //
  // request the page and allow it to fail
  // https://on.cypress.io/request
  // Tip: you can check the response status code
  // to see if it was successful, or use the
  // property "isOkStatusCode" to determine
  // if the server is ready to accept requests
  cy.request({
    url,
    failOnStatusCode: false,
  }).then(res => {
    if(res.isOkStatusCode == true){
      cy.log('all good in the hood')
      return
    } else{
      cy.wait(1_000)
      pingPage(url, n - 1)
    }
  })
  //
  // get the success status
  // and if it is true, we are done,
  // the server is up and running
  // else wait 1 second and try pinging again
  // (use recursion)
}

beforeEach(() => {
  // reset the unreliable server to its initial state
  cy.request('POST', '/unreliable')
  // now the first 2 requests to GET /unreliable
  // will fail with a 500 status code
  // and after that the page load will succeed
})

it('checks the unreliable page before visiting', () => {
  // ping the page "/unreliable" until it responds
  // with a successful status code
  pingPage('/unreliable', 5)
  // then visit the page "/unreliable"
  // https://on.cypress.io/visit
  cy.visit('/unreliable')
})
