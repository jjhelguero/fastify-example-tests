/// <reference types="cypress" />
// custom command definitions from the "cypress-network-idle" plugin
/// <reference types="cypress-network-idle" />
// load the custom commands from the "cypress-network-idle" plugin
import 'cypress-network-idle'

it('waits for network calls to finish', () => {
  // We want to visit the page "/calculator.html"
  // it might fire "POST /track" events
  // one, twice, or three times on load
  // Let's prepare to wait for those calls
  // by using a custom command from
  // https://github.com/bahmutov/cypress-network-idle
  //
  // now visit the /calculator.html page
  cy.waitForNetworkIdlePrepare({
    method: 'POST',
    pattern: '*',
    alias: 'track'
  })
  cy.visit('/calculator.html')
  //
  // wait for all possible tracking calls
  // plus 1 second of idle time
  cy.waitForNetworkIdle('@track', 1_000)
    .then(({callCount, waited}) => {
      expect(callCount, 'call count').to.be.within(1,3)
      expect(waited, 'waited').to.be.above(1000)
    })
  //
  // log the yielded information about the wait
  // using console.log + cy.then
  //
  // you can confirm the number of matching network calls
  // and the time waited: callCount, waited
})
