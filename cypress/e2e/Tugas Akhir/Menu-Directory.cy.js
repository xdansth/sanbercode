import Login from '../../support/PageObject/Login'
import LoginData from '../../fixtures/LoginData'
import directoryPage from '../../support/PageObject/DirectoryPage'

const login = new Login()

describe('Directory Menu OrangeHRM', () => {

    beforeEach(() => {
    login.visit()
    login.login(LoginData.validUser, LoginData.validPassword)
    directoryPage.openDirectory()
    })

    it('TC2.1 Verify Directory Page Loaded', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('employeeList')
        directoryPage.openDirectory()
        cy.wait('@employeeList').its('response.statusCode').should('eq', 200)
    })

    it('TC2.2 Search Employee By Name', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchEmployee')
        directoryPage.employeeName('Harun')
        directoryPage.clickSearch()
        cy.wait('@searchEmployee').its('response.statusCode').should('eq', 200) 
        cy.get('.oxd-grid-item').should('exist')
    })

    it('TC2.3 Search Employee By Job Title', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchJob')
        directoryPage.selectJobTitle('Executive Officer')
        directoryPage.clickSearch()
        cy.wait('@searchJob').its('response.statusCode').should('be.oneOf',[200,201])
    })

    it('TC2.4 Search Employee By Location', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchLocation')
        directoryPage.selectLocation('New York Sales Office')
        directoryPage.clickSearch()
        cy.wait('@searchLocation').its('response.statusCode').should('be.oneOf',[200,201])
    })

    it('TC2.5 Search By Multiple Filters', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchMulti')
        directoryPage.employeeName('Harun')
        directoryPage.selectJobTitle('Executive Officer')
        directoryPage.clickSearch()
        cy.wait('@searchMulti').its('response.statusCode').should('be.oneOf',[200,201])
    })

    it('TC2.6 Reset Search Criteria', () => {
       directoryPage.employeeName('Harun    ')
       directoryPage.clickReset()
       cy.get('input[placeholder="Type for hints..."]').should('have.value', '')
   })

    it('TC2.7 View Employee Profile Card', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('employeeList')
        cy.wait('@employeeList').its('response.statusCode').should('be.oneOf',[200,201])
        cy.get('.orangehrm-directory-card').first().should('be.visible')
    })

    it('TC2.8 Verify Employee List Displayed', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('employeeList')
        cy.wait('@employeeList').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
        expect(interception.response.body.data.length).to.be.greaterThan(0)
        })
    })

})