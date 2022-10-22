/// <reference types="cypress" />

it(
  'uploads a file',
  { viewportHeight: 400, viewportWidth: 300 },
  () => {
    // visit the /upload-pic.html
    // https://on.cypress.io/visit
    cy.visit('/upload-pic.html')
    // enter the username "test"
    // and select a png fixture "profile.png"
    // in the picture file input
    // https://on.cypress.io/selectfile
    cy.get('input[name=username').type('test')
    
    cy.get('input[type=file]').selectFile('cypress/fixtures/bunny.png')
    //
    // submit the form
    // verify the URL has changed correctly
    // https://on.cypress.io/location
    cy.contains('button', /submit/i).click()
    cy.location('pathname').should('equal', '/upload-profile-picture')
    //
    // the page should have the correct success message
    // and have the image with attribute "alt=Profile picture"
    cy.contains('Updated profile picture for test')
    cy.get('img[alt="Profile picture"]')
      .should('be.visible')
    //
    // Bonus 1: verify the shown image has the same
    // expected dimensions
    // by checking the "naturalWidth" and "naturalHeight" props
      .and($img => {
          expect($img,'profile picture').to.have.prop('naturalWidth', 1280).and.to.have.prop('naturalHeight', 937)
        })
    //
    // Bonus 2: verify the fixture image "profile.png" has the
    // expected dimensions by constructing a temp image element
    // https://on.cypress.io/fixture
    // Load the fixture image in base64 encoding
    // the form the "data:image/png..." source string
    // and create a jQuery image object using Cypress.$
    // and confirm its "naturalWidth" and "naturalHeight" props
    cy.fixture('bunny.png', 'base64').then(base64 => {
      const src = `data:image/png;base64,${base64}`
      const img = Cypress.$(`<img src=${src} />`)
      expect(img,'profile picture').to.have.prop('naturalWidth', 1280).and.to.have.prop('naturalHeight', 937)

      const width = img.prop('naturalWidth')
      const height = img.prop('naturalHeight')
      cy.get('img[alt="Profile picture"]').should(
        ($img) => {
          expect($img, 'profile image dimensions')
            .to.have.prop('naturalWidth', width)
            .and.to.have.prop('naturalHeight', height)
        },
      )
    })


  },
)
