/// <reference types="cypress" />

it('logs in using POST request', () => {
  // log in using https://on.cypress.io/request command
  // endpoint POST /login
  // options { username: "gleb", password: "network-course" }
  cy.request('POST', '/login', {
    username: 'gleb',
    password: 'network-course'
  })
    .its('headers.set-cookie')
    .should('have.length.greaterThan', 0)
  //
  // from the request response, grab the
  // headers and its parsed "set-cookie" property
  // and confirm it is an array and is non-empty
  //
  // grab the cookie "userName" using
  // https://on.cypress.io/getcookie
  // confirm the object has the following properties
  // domain: "localhost"
  // path: "/"
  // name: "userName"
  // httpOnly: true
  // secure: false (because of http localhost)
  // for http localhost, the cookie is "secure: false"
  cy.getCookie('userName')
    .should('be.an', 'object')
    .should('deep.include', {
      domain: 'localhost',
      path: '/',
      name: 'userName',
      httpOnly: true,
      // for http localhost, the cookie is "secure: false"
      secure: false,
    })
    .and('have.a.property', 'value')
  //
  // note we cannot confirm the value because the cookie
  // is encoded and has a random value at the end
  // so we should simply confirm the cookie has
  // the property "value"
  //
  // visit the page / using cy.visit
  cy.visit('/')
  //
  // confirm the H1 element includes the user name "gleb"
  cy.contains('h1', 'gleb')
})
