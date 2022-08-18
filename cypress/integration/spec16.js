/// <reference types="cypress" />
import { recurse } from 'cypress-recurse'
it('requests all fruits', () => {
  // request the fruit from the /fruit endpoint
  // using the https://on.cypress.io/request command
  // from the response get the body object, then the fruit
  // using the https://on.cypress.io/its command
  // store each fruit in a Set object
  // and keep requesting until we see a fruit already in the set
  // print the collected list of fruits

  recurse(
    () => {
      return cy.request('/fruit').its('body.fruit')
    },
    (fruit, fruits) => fruits.has(fruit),
    {
      log: false,
      timeout: 10_000,
      reduceFrom: new Set(),
      reduce(fruits, fruit) {
        fruits.add(fruit)
      },
      yield: 'reduced',
      post: ({ value }) => {
        cy.log(value)
      },
    },
  ).then((fruits) => {
    const list = [...fruits].sort()
    cy.log(list.join(','))
  })
})
