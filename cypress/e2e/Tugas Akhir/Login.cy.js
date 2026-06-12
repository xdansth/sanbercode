import Login from '../../support/PageObject/Login'  // Mengimpor class Login dari folder Page Object
import LoginData from '../../fixtures/LoginData'    // Mengimpor data login dari folder fixtures

describe('Login Website OrangeHRM', () => {         // Membuat test suite yang berisi kumpulan test case login.
    const login = new Login();             // Membuat instance dari class Login untuk digunakan dalam test case.

    it('TC1.1 - User ingin masuk ke halaman Login OrangeHRM', () => {
        login.interceptLoginMessages()   // Menggunakan method interceptLoginMessages untuk memantau pesan yang dikirim saat login.
        login.verifyLoginWeb()      // Menggunakan method verifyLoginWeb untuk memastikan bahwa halaman login dapat diakses dengan benar.
        login.verifyMessagesAPI()   // Menggunakan method verifyMessagesAPI untuk memastikan bahwa pesan yang dikirim saat login sesuai dengan yang diharapkan.
    })
    it('TC1.2 - User Berhasil Masuk ke Dalam OrangeHRM', () => {
        login.visit()           // Menggunakan method visit untuk membuka halaman login.
        login.interceptDashboardApis()      // Menggunakan method interceptDashboardApis untuk memantau API yang dipanggil saat masuk ke dashboard.
        login.login(LoginData.validUser, LoginData.validPassword)   // Menggunakan method login untuk melakukan login dengan data yang valid.
        login.verifyDashboardApis()   // Menggunakan method verifyDashboardApis untuk memastikan bahwa API yang dipanggil saat masuk ke dashboard sesuai dengan yang diharapkan.
        login.verifyDashboard()     // Menggunakan method verifyDashboard untuk memastikan bahwa pengguna berhasil masuk ke dashboard.
    })

    it('TC1.3 - User Copy Paste pada Login OrangeHRM', () => {
        login.visit()   // Menggunakan method visit untuk membuka halaman login.
        login.grantClipboardPermission()    // Menggunakan method grantClipboardPermission untuk memberikan izin akses clipboard kepada aplikasi.
        login.copyPasteUsername('Admin')    // Menggunakan method copyPasteUsername
        login.copyPastePassword('admin123') // Menggunakan method copyPastePassword
        login.interceptActionSummary()      // Menggunakan method interceptActionSummary untuk memantau ringkasan tindakan yang terjadi saat login.
        login.clickLogin()              // Menggunakan method clickLogin untuk mengklik tombol login setelah melakukan copy paste pada username dan password.
        login.verifyActionSummary()     // Menggunakan method verifyActionSummary untuk memastikan bahwa ringkasan tindakan yang terjadi saat login sesuai dengan yang diharapkan.
        login.verifyDashboard()     // Menggunakan method verifyDashboard untuk memastikan bahwa pengguna berhasil masuk ke dashboard setelah melakukan copy paste pada username dan password.
    })

    it('TC1.4 - Username Kosong & Password Diisi', () => {
        login.visit()       // Menggunakan method visit untuk membuka halaman login.
        login.enterPassword('admin123') // Menggunakan method enterPassword untuk memasukkan password, sementara username dibiarkan kosong.
        login.clickLogin()      // Menggunakan method clickLogin untuk mengklik tombol login setelah memasukkan password tanpa username.
        login.verifyRequiredMessage()   // Menggunakan method verifyRequiredMessage untuk memastikan bahwa pesan "Required" muncul karena username kosong.
    })

    it('TC1.5 - Password Kosong & Username Diisi', () => {
        login.visit()       // Menggunakan method visit untuk membuka halaman login.
        login.enterUsername('Admin')    // Menggunakan method enterUsername untuk memasukkan username, sementara password dibiarkan kosong.
        login.clickLogin()      // Menggunakan method enterUsername untuk memasukkan username, sementara password dibiarkan kosong.
        login.verifyRequiredMessage()   // Menggunakan method verifyRequiredMessage untuk memastikan bahwa pesan "Required" muncul karena password kosong.
    })

    it('TC1.6 - Username & Password Kosong', () => {
        login.visit()       // Menggunakan method visit untuk membuka halaman login.
        login.clickLogin()      // Menggunakan method clickLogin untuk mengklik tombol login tanpa memasukkan username dan password.
        login.verifyRequiredMessage()       // Menggunakan method verifyRequiredMessage untuk memastikan bahwa pesan "Required" muncul karena username dan password kosong.
    })

    it('TC1.7 - Username & Password Salah', () => {
        login.visit()       // Menggunakan method visit untuk membuka halaman login.
        login.login(LoginData.invalidUser, LoginData.invalidPassword)   // Menggunakan method login untuk melakukan login dengan data yang tidak valid.
        login.verifyInvalidCredentials()    // Menggunakan method verifyInvalidCredentials untuk memastikan bahwa pesan "Invalid credentials" muncul karena username dan password yang salah.
    })

    it('TC1.8 - User Berhasil Mengakses Forgot Password', () => {
        login.visit()    // Menggunakan method visit untuk membuka halaman login.
        login.clickForgotPassword()     // Menggunakan method clickForgotPassword untuk mengklik link "Forgot your password?" pada halaman login.
        login.verifyForgotPasswordPage()    // Menggunakan method verifyForgotPasswordPage untuk memastikan bahwa pengguna berhasil diarahkan ke halaman "Forgot Password".
    })
})