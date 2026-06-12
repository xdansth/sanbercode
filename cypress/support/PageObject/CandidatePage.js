class CandidatePage {

clickAdd() 
    {
    cy.contains('Add').click()
    }

inputFirstName(firstName) 
    {
    cy.get('input[name="firstName"]').type(firstName)
    }

inputLastName(lastName) 
    {
    cy.get('input[name="lastName"]').type(lastName)
     }

selectVacancy(vacancy) 
    {
    cy.get('.oxd-select-text').eq(0).click()
    cy.contains(vacancy).click()
    }

inputEmail(email) 
    {
    cy.get('input').eq(4).type(email)
    }

save() 
    {
    cy.contains('Save').click()
    }

searchCandidate(name) 
    {
    cy.get('.oxd-input').eq(1).clear().type(name)
    cy.contains('Search').click()
    }

}

export default new CandidatePage()