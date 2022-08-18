/// <reference types="cypress" />

it('requests an image and gets its dimensions', () => {
  // request the image ourselves using cy.request command
  // with the "encoding: base64" option
  cy.request({
    url: '/tiger.png',
    encoding: 'base64',
  }).then(({ body, headers }) => {
    const mime = headers['content-type']
    const dataUrl = `data:${mime};base64,${body}`
    const image = document.createElement('img')
    image.src = dataUrl
    cy.wait(100).then(() => {
      expect(image).to.have.property(
        'naturalHeight',
        914,
        'image height',
      )
    })
  })
  //
  // from the response get the body and the headers fields
  // from the headers object, grab the "content-type" header
  // which gives us the correct mime type, like "image/png"
  //
  // form the image data URL with the mime type and the base64 encoded image
  // following the template `data:${mime};base64,${body}`
  //
  // to parse the data URL and have an image element
  // use document.createElement and set the "src" attribute
  // let the browser decode the image by sleeping 100ms
  // https://on.cypress.io/wait
  // and using .then callback with the assertion
  //
  // from the image element, get the naturalHeight property
  // and confirm its value is 914 pixels
})
