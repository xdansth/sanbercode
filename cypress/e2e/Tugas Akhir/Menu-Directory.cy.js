import Login from '../../support/PageObject/Login'      // Mengimpor class Login dari folder Page Object
import LoginData from '../../fixtures/LoginData'    // Mengimpor data login dari folder fixtures
import directoryPage from '../../support/PageObject/DirectoryPage'  // Mengimpor class DirectoryPage dari folder Page Object

const login = new Login()   // Membuat instance dari class Login untuk digunakan dalam test case.

describe('Directory Menu OrangeHRM', () => {        // Membuat test suite yang berisi kumpulan test case untuk menu Directory.

    beforeEach(() => {      // Menjalankan fungsi sebelum setiap test case dalam suite ini.
    login.visit()       // Menggunakan method visit untuk membuka halaman login sebelum setiap test case.
    login.login(LoginData.validUser, LoginData.validPassword)   // Menggunakan method login untuk melakukan login dengan data yang valid sebelum setiap test case.
    directoryPage.openDirectory()       
    })

    it('TC2.1 Verify Directory Page Loaded', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('employeeList')     // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mengambil daftar karyawan di halaman Directory, dan memberikan alias 'employeeList' untuk permintaan tersebut.
        directoryPage.openDirectory()       // Menggunakan method openDirectory untuk membuka halaman Directory.
        cy.wait('@employeeList').its('response.statusCode').should('eq', 200)   // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'employeeList' selesai, kemudian memeriksa bahwa status code dari respons adalah 200, yang menunjukkan bahwa halaman Directory berhasil dimuat.
    })

    it('TC2.2 Search Employee By Name', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchEmployee')   // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mencari karyawan berdasarkan nama di halaman Directory, dan memberikan alias 'searchEmployee' untuk permintaan tersebut.
        directoryPage.employeeName('Harun')     // Menggunakan method employeeName untuk memasukkan nama "Harun" ke dalam field pencarian nama karyawan di halaman Directory.
        directoryPage.clickSearch()     // Menggunakan method clickSearch untuk mengklik tombol Search setelah memasukkan nama karyawan yang ingin dicari.
        cy.wait('@searchEmployee').its('response.statusCode').should('eq', 200)     // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'searchEmployee' selesai, kemudian memeriksa bahwa status code dari respons adalah 200, yang menunjukkan bahwa pencarian karyawan berhasil dilakukan.
        cy.get('.oxd-grid-item').should('exist')    // Menggunakan cy.get untuk memeriksa bahwa elemen dengan kelas 'oxd-grid-item' (yang mewakili hasil pencarian karyawan) ada di halaman, yang menunjukkan bahwa hasil pencarian ditampilkan dengan benar.
    })

    it('TC2.3 Search Employee By Job Title', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchJob')    // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mencari karyawan berdasarkan jabatan di halaman Directory, dan memberikan alias 'searchJob' untuk permintaan tersebut.
        directoryPage.selectJobTitle('Executive Officer')   // Menggunakan method selectJobTitle untuk memilih jabatan "Executive Officer" dari dropdown pencarian jabatan di halaman Directory.
        directoryPage.clickSearch()     // Menggunakan method clickSearch untuk mengklik tombol Search setelah memilih jabatan yang ingin dicari.
        cy.wait('@searchJob').its('response.statusCode').should('be.oneOf',[200,201])   // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'searchJob' selesai, kemudian memeriksa bahwa status code dari respons adalah salah satu dari 200 atau 201, yang menunjukkan bahwa pencarian karyawan berdasarkan jabatan berhasil dilakukan.
    })

    it('TC2.4 Search Employee By Location', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchLocation')   // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mencari karyawan berdasarkan lokasi di halaman Directory, dan memberikan alias 'searchLocation' untuk permintaan tersebut.
        directoryPage.selectLocation('New York Sales Office')      // Menggunakan method selectLocation untuk memilih lokasi "New York Sales Office" dari dropdown pencarian lokasi di halaman Directory.
        directoryPage.clickSearch()     // Menggunakan method selectLocation untuk memilih lokasi "New York Sales Office" dari dropdown pencarian lokasi di halaman Directory, kemudian menggunakan method clickSearch untuk mengklik tombol Search setelah memilih lokasi yang ingin dicari.
        cy.wait('@searchLocation').its('response.statusCode').should('be.oneOf',[200,201])  // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'searchLocation' selesai, kemudian memeriksa bahwa status code dari respons adalah salah satu dari 200 atau 201, yang menunjukkan bahwa pencarian karyawan berdasarkan lokasi berhasil dilakukan.
    })

    it('TC2.5 Search By Multiple Filters', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('searchMulti')  // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mencari karyawan berdasarkan beberapa filter di halaman Directory, dan memberikan alias 'searchMulti' untuk permintaan tersebut.
        directoryPage.employeeName('Harun')    // Menggunakan method employeeName untuk memasukkan nama "Harun" ke dalam field pencarian nama karyawan di halaman Directory, kemudian menggunakan method selectJobTitle untuk memilih jabatan "Executive Officer" dari dropdown pencarian jabatan di halaman Directory, dan terakhir menggunakan method clickSearch untuk mengklik tombol Search setelah memasukkan nama karyawan dan memilih jabatan yang ingin dicari.
        directoryPage.selectJobTitle('Executive Officer')   // Menggunakan method selectJobTitle untuk memilih jabatan "Executive Officer" dari dropdown pencarian jabatan di halaman Directory.
        directoryPage.clickSearch()     // Menggunakan method clickSearch untuk mengklik tombol Search setelah memasukkan nama karyawan dan memilih jabatan yang ingin dicari.
        cy.wait('@searchMulti').its('response.statusCode').should('be.oneOf',[200,201])  // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'searchMulti' selesai, kemudian memeriksa bahwa status code dari respons adalah salah satu dari 200 atau 201, yang menunjukkan bahwa pencarian karyawan berdasarkan beberapa filter berhasil dilakukan.
    })

    it('TC2.6 Reset Search Criteria', () => {
       directoryPage.employeeName('Harun')  // Menggunakan method employeeName untuk memasukkan nama "Harun" ke dalam field pencarian nama karyawan di halaman Directory, kemudian menggunakan method selectJobTitle untuk memilih jabatan "Executive Officer" dari dropdown pencarian jabatan di halaman Directory, dan terakhir menggunakan method clickSearch untuk mengklik tombol Search setelah memasukkan nama karyawan dan memilih jabatan yang ingin dicari.
       directoryPage.clickReset()   // Menggunakan method clickReset untuk mengklik tombol Reset setelah melakukan pencarian dengan beberapa filter, yang akan menghapus semua kriteria pencarian yang telah dimasukkan.
       cy.get('input[placeholder="Type for hints..."]').should('have.value', '')    // Menggunakan cy.get untuk memeriksa bahwa field pencarian nama karyawan (yang memiliki placeholder "Type for hints...") memiliki nilai kosong setelah tombol Reset diklik, yang menunjukkan bahwa kriteria pencarian berhasil direset.
   })

    it('TC2.7 View Employee Profile Card', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('employeeList')     // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mengambil daftar karyawan di halaman Directory, dan memberikan alias 'employeeList' untuk permintaan tersebut.
        cy.wait('@employeeList').its('response.statusCode').should('be.oneOf',[200,201])    // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'employeeList' selesai, kemudian memeriksa bahwa status code dari respons adalah salah satu dari 200 atau 201, yang menunjukkan bahwa halaman Directory berhasil dimuat.
        cy.get('.orangehrm-directory-card').first().should('be.visible')    // Menggunakan cy.get untuk memeriksa bahwa elemen dengan kelas 'orangehrm-directory-card' (yang mewakili kartu profil karyawan) yang pertama ada dan terlihat di halaman, yang menunjukkan bahwa kartu profil karyawan ditampilkan dengan benar.
    })

    it('TC2.8 Verify Employee List Displayed', () => {
        cy.intercept('GET','**/api/v2/directory/employees*').as('employeeList')     // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mengambil daftar karyawan di halaman Directory, dan memberikan alias 'employeeList' untuk permintaan tersebut.
        cy.wait('@employeeList').then((interception) => {       // Menggunakan cy.wait untuk menunggu permintaan dengan alias 'employeeList' selesai, kemudian menggunakan .then untuk mengakses objek interception yang berisi informasi tentang permintaan dan respons.
        expect(interception.response.statusCode).to.eq(200)     // Menggunakan expect untuk memeriksa bahwa status code dari respons adalah 200, yang menunjukkan bahwa permintaan untuk mengambil daftar karyawan berhasil dilakukan.
        expect(interception.response.body.data.length).to.be.greaterThan(0)  // Menggunakan expect untuk memeriksa bahwa panjang array data dalam respons lebih besar dari 0, yang menunjukkan bahwa daftar karyawan berhasil ditampilkan di halaman Directory.
        })
    })

})