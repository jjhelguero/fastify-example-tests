/// <reference types="cypress" />
import { recurse } from 'cypress-recurse'
it('finds all fruits', () => {
  const fruits = new Set()
  function fruitIsDuplicate() {
    cy.get('#fruit')
      .should('not.contain.text', 'loading')
      .invoke('text')
      .then((fruit) => {
        if (fruits.has(fruit)) {
          cy.log(`We have ${fruit} already`)
          const list = [...fruits].sort()
          cy.log(list.join(', '))
          expect(list).to.have.length(5)
        } else {
          fruits.add(fruit)
          cy.log(fruit)
          cy.wait(500)
          cy.reload().then(fruitIsDuplicate)
        }
      })
  }
  // visit the page
  cy.visit('/')
  // keep getting the fruit from the page
  // and storing it in a Set object
  // and reloading the page
  // until we see the fruit we have already added
  // print the collected list of fruits
  // check its length against the expected value
  fruitIsDuplicate()
})

// Bonus 2: use cypress-recurse to find all fruits
// install the plugin cypress-recurse
// https://github.com/bahmutov/cypress-recurse
// npm i -D cypress-recurse
// and import or require it in this spec file
// import { recurse } from 'cypress-recurse'
it('finds all the fruit using cypress-recurse', () => {
  // let's use the "recurse" function to reload the page
  // until we see a repeated fruit. Then we can stop
  // since we have seen all the fruits.
  //
  // First, visit the page
  // https://on.cypress.io/visit
  // keep track of the fruits we have seen
  // using a Set object
  cy.visit('/')
  //
  // call the recurse function
  // first argument is a function that gets
  // the fruit from the page
  // second argument is a predicate that returns true
  // if we have already seen the fruit
  // third argument is an options object
  // that can have "post" method that gets called
  // where we add the fruit to the Set object
  // and reload the page
  recurse(
    () => {
      return cy
        .get('#fruit')
        .should('not.contain.text', 'loading')
        .invoke('text')
    },
    (fruit, fruits) => fruits.has(fruit),
    {
      log: false,
      limit: 10,
      timeout: 10_000,
      reduceFrom: new Set(),
      reduce(fruits, fruit) {
        fruits.add(fruit)
      },
      yield: 'reduced',
      post: ({ value }) => {
        cy.log(value)
        cy.reload()
      },
    },
  ).then((fruits) => {
    const list = [...fruits].sort()
    cy.log('Found all fruits!')
    cy.log(list.join(','))
    expect(list).to.have.length(5)
  })
  //
  // the "recurse" from cypress-recurse
  // is chainable, so we can chain a ".then" callback
  // to check the length of the Set object and confirm
  // the collected fruit names
  //
  // print the collected list of fruits
  // check its length against the expected value
})
