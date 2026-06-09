import Login from '../../support/PageObject/Login'

describe('Login Website OrangeHRM', () => {
    const login = new Login();

    it('TC1.1 - User ingin masuk ke halaman Login OrangeHRM', () => {
        login.interceptLoginMessages()
        login.verifyLoginWeb()
        login.verifyMessagesAPI()
    })
    it('TC1.2 - User Berhasil Masuk ke Dalam OrangeHRM', () => {
        login.visit()
        login.interceptDashboardApis()
        login.login('Admin', 'admin123')
        login.verifyDashboardApis()
        login.verifyDashboard()
    })

    it('TC1.3 - User Copy Paste pada Login OrangeHRM', () => {
        login.visit()
        login.grantClipboardPermission()
        login.copyPasteUsername('Admin')
        login.copyPastePassword('admin123')
        login.interceptActionSummary()
        login.clickLogin()
        login.verifyActionSummary()
        login.verifyDashboard()
    })

    it('TC1.4 - Username Kosong & Password Diisi', () => {
        login.visit()
        login.enterPassword('admin123')
        login.clickLogin()
        login.verifyRequiredMessage()
    })

    it('TC1.5 - Password Kosong & Username Diisi', () => {
        login.visit()
        login.enterUsername('Admin')
        login.clickLogin()
        login.verifyRequiredMessage()
    })

    it('TC1.6 - Username & Password Kosong', () => {
        login.visit()
        login.clickLogin()
        login.verifyRequiredMessage()
    })

    it('TC1.7 - Username & Password Salah', () => {
        login.visit()
        login.login('Bebas', 'bebas1234')
        login.verifyInvalidCredentials()
    })

    it('TC1.8 - User Berhasil Mengakses Forgot Password', () => {
        login.visit()
        login.clickForgotPassword()
        login.verifyForgotPasswordPage()
    })
})