class DirectoryPage {

openDirectory() 
    {
    cy.contains('Directory').click()
    }

employeeName(name) 
    {
 //   cy.get('input[placeholder="Type for hints..."]').clear().type(name)
    cy.get('.oxd-autocomplete-text-input input').first().clear().type(name)
    }

selectJobTitle(jobTitle) 
    {
    cy.get('.oxd-select-text').eq(0).click()
    cy.contains(jobTitle).click()
    }

selectLocation(location) 
    {
    cy.get('.oxd-select-text').eq(1).click()
    cy.contains(location).click()
    }

clickSearch() 
    {
    cy.contains('Search').click()
    }

clickReset() 
    {
    cy.contains('Reset').click()
    cy.get('input[placeholder="Type for hints..."]').clear()
    }

}

export default new DirectoryPage()