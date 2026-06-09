describe('Login Website OrangeHRM', () => {
  
    it('TC1.1-User ingin masuk ke halaman Login OrangeHRM', () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('Loginmessages')
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.contains('Login').should('be.visible')
        cy.wait('@Loginmessages').its('response.statusCode').should('be.oneOf',[200,304])
    })

    it('TC1.2-User Berhasil Masuk ke Dalam OrangeHRM', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('Admin')
        cy.get('[name="password"]').type('admin123')
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/events/push').as('push')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('subunit')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts')
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('locations')
        cy.get('button[type="submit"]').click()
        cy.wait('@locations').its('response.statusCode').should('eq',200)
        cy.wait('@shortcuts').its('response.statusCode').should('eq',200)
        cy.wait('@subunit').its('response.statusCode').should('eq',200)
        cy.wait('@push').its('response.statusCode').should('be.oneOf',[200, 204])
        cy.url().should('include', '/web/index.php/dashboard/index')
    })

    it('TC1.3 - User Copy Paste pada Login OrangeHRM', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // Grant Permissions via Chrome Debugger Protocol
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
            permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
            origin: window.location.origin,
                },
    }),
    )

    // Copy Paste pada Username
    cy.window().then((win1) => {
        return win1.navigator.clipboard.writeText('Admin')
    })
    cy.window().then((win1) => {
        return win1.navigator.clipboard.readText()
    }).then((text1) => {
        cy.get('[name="username"]')
            .type(text1)
            .should('have.value', 'Admin')
    })
   // Copy Paste Password
    cy.window().then((win2) => {
        return win2.navigator.clipboard.writeText('admin123')
    })
    cy.window().then((win2) => {
        return win2.navigator.clipboard.readText()
    }).then((text2) => {
        cy.get('[name="password"]')
            .type(text2)
    })
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary')
        cy.get('button[type="submit"]').click()
        cy.wait('@actionsummary').its('response.statusCode').should('eq',200)
        cy.url().should('include', '/web/index.php/dashboard/index')
  })

  it('TC1.4 - Test Username Kosong & Password Diisikan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
  })  

  it('TC1.5 - Test Password Kosong & Username Diisikan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
  })
 
  it('TC1.6 - Test Username & Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
  })

  it('TC1.7 - Test Username & Password Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Bebas')
    cy.get('[name="password"]').type('bebas1234')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')
  })

  it('TC1.8 - User Berhasil mengakses fitur Forgot Password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.contains('Forgot your password?').click()
    cy.url().should('include', '/web/index.php/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
  })
})