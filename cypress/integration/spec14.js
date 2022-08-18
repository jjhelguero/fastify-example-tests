/// <reference types="cypress" />

it('reloads the page until it shows Bananas', () => {
  function checkIfBanana() {
    cy.get('#fruit')
      .should('not.contain.text', 'loading')
      .invoke('text')
      .then((fruit) => {
        if (fruit == 'Bananas') {
          cy.log('We have Bananas!')
          return
        } else {
          cy.wait(1000)
          cy.reload().then(checkIfBanana)
        }
      })
  }
  cy.intercept('GET', '/friut')
  // visit the page
  cy.clock()
  cy.visit('/')
  // if it shows the fruit "Bananas", stop
  // else
  //   wait for 1 second for clarity
  //   reload the page
  //   check again
  // Tip: use recursion
  checkIfBanana()
})
