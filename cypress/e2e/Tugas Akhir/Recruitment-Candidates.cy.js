import Login from '../../support/PageObject/Login'
import LoginData from '../../fixtures/LoginData'
import recruitmentPage from '../../support/PageObject/RecruitmentPage'
import candidatePage from '../../support/PageObject/CandidatePage'

const login = new Login()

describe('Recruitment Candidates OrangeHRM', () => {
 
    beforeEach(() => {
    login.visit()
    login.login(LoginData.validUser, LoginData.validPassword)
    recruitmentPage.openRecruitment()
    })

    it('TC3.1 Add Candidate', () => {
        cy.intercept('POST', '**/recruitment/candidates').as('addCandidate')
        candidatePage.clickAdd()
        candidatePage.inputFirstName('John')
        candidatePage.inputLastName('Doe')
        candidatePage.inputEmail('john@mail.com')
        candidatePage.save()
        cy.wait('@addCandidate').its('response.statusCode').should('eq', 200)
    })

    it('TC3.2 Search Candidate', () => {
        cy.intercept('GET', '**/candidates*').as('searchCandidate')
        candidatePage.searchCandidate('John')
        cy.wait('@searchCandidate')
    })

    it('TC3.3 Reset Filter', () => {
        cy.contains('Reset').click()
        cy.get('.oxd-input').eq(1).should('have.value', '')
    })

    it('TC3.4 View Candidate Detail', () => {
        cy.get('.oxd-table-card').first().click()
        cy.contains('Candidate Profile').should('exist')
    })

    it('TC3.5 Edit Candidate', () => {
        cy.intercept('PUT', '**/candidates/**').as('updateCandidate')
        cy.get('.bi-pencil-fill').first().click()
        cy.get('input[name="firstName"]').clear().type('Edited')
        candidatePage.save()
        cy.wait('@updateCandidate')
    })

    it('TC3.6 Delete Candidate', () => {
        cy.intercept('DELETE', '**/candidates/**').as('deleteCandidate')
        cy.get('.bi-trash').first().click()
        cy.contains('Yes, Delete').click()
        cy.wait('@deleteCandidate')
    })

    it('TC3.7 Search Candidate by Vacancy', () => {
        cy.intercept('GET', '**/candidates*').as('filterVacancy')
        cy.get('.oxd-select-text').first().click()
        cy.contains('Senior QA Lead').click()
        cy.contains('Search').click()
        cy.wait('@filterVacancy')
    })

    it('TC3.8 Required Validation', () => {
        candidatePage.clickAdd()
        candidatePage.save()
        cy.contains('Required')   .should('exist')
    })

})