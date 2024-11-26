Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Luana')
    cy.get('#lastName').type('Barth')
    cy.get('#email').type('luana@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})
