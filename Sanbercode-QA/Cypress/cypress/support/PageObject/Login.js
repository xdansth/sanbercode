class Login {

    // Selectors
    usernameField = '[name="username"]'
    passwordField = '[name="password"]'
    submitButton = 'button[type="submit"]'
    // forgotPasswordLink = 'a'
    requiredMessage = 'Required'

    visit() { cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') }
    enterUsername(username) { cy.get(this.usernameField).clear().type(username) }
    enterPassword(password) { cy.get(this.passwordField).clear().type(password) }

    // Action TC1.1
    verifyLoginWeb() { cy.contains('Login').should('be.visible') }

    // Action TC1.2 & TC1.7
    login(username, password) {
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLogin()     }
    
    // Action TC1.3, TC1.4, TC1.5, TC1.6
    clickLogin() { cy.get(this.submitButton).click() }

    // Action TC1.8
    clickForgotPassword() { cy.contains('Forgot your password?').click() }

    // Intercepts
    interceptLoginMessages() {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('Loginmessages')
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
                             }

    interceptDashboardApis() { 
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/events/push').as('push')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('subunit')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('locations')
                             }

    interceptActionSummary() { cy.intercept('GET','**/dashboard/employees/action-summary').as('actionsummary') }

    // Intercepts Verify
    verifyMessagesAPI() { cy.wait('@Loginmessages').its('response.statusCode').should('be.oneOf', [200, 304]) }

    verifyDashboardApis() {
        cy.wait('@locations').its('response.statusCode').should('eq', 200)
        cy.wait('@shortcuts').its('response.statusCode').should('eq', 200)
        cy.wait('@subunit').its('response.statusCode').should('eq', 200)
        cy.wait('@push').its('response.statusCode').should('be.oneOf', [200, 204])
                          }

    verifyActionSummary() { cy.wait('@actionsummary').its('response.statusCode').should('eq', 200) }

    verifyForgotPasswordPage() {
        cy.url().should('include', '/web/index.php/auth/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
        cy.get('input[name="username"]').should('be.visible')
                               }
    
    //Default Verify
    verifyDashboard() { cy.url().should('include', '/web/index.php/dashboard/index') }
    verifyRequiredMessage() { cy.contains(this.requiredMessage).should('be.visible') }
    verifyInvalidCredentials() { cy.contains('Invalid credentials').should('be.visible') }

    // Copy Paste pada Username
    copyPasteUsername(username) { cy.window().then((win) => { return win.navigator.clipboard.writeText(username) })
        cy.window().then((win) => { return win.navigator.clipboard.readText() }).then((text) => {
        cy.get(this.usernameField).type(text).should('have.value', username) })
                                }
    // Copy Paste Password
    copyPastePassword(password) { cy.window().then((win) => { return win.navigator.clipboard.writeText(password) })
        cy.window().then((win) => { return win.navigator.clipboard.readText() }).then((text) => {
        cy.get(this.passwordField).type(text) })
                                }
    // Grant Permissions via Chrome Debugger Protocol
    grantClipboardPermission() {
        cy.wrap(Cypress.automation('remote:debugger:protocol', { command: 'Browser.grantPermissions',
            params: { permissions: ['clipboardReadWrite','clipboardSanitizedWrite'], origin: window.location.origin } }) )
                               }
    }

export default Login