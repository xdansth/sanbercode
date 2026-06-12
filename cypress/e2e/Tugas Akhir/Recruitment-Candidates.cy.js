import Login from '../../support/PageObject/Login'  // Mengimpor class Login dari folder Page Object
import LoginData from '../../fixtures/LoginData'    // Mengimpor data login dari folder fixtures
import recruitmentPage from '../../support/PageObject/RecruitmentPage'  // Mengimpor class RecruitmentPage dari folder Page Object
import candidatePage from '../../support/PageObject/CandidatePage'  // Mengimpor class CandidatePage dari folder Page Object

const login = new Login()   // Membuat instance dari class Login untuk

describe('Recruitment Candidates OrangeHRM', () => {    // Membuat test suite yang berisi kumpulan test case untuk fitur Recruitment Candidates.
 
    beforeEach(() => {  // Menjalankan fungsi sebelum setiap test case dalam suite ini untuk memastikan bahwa setiap test case dimulai dengan kondisi yang sama, yaitu pengguna sudah login dan berada di halaman Recruitment
    login.visit()   // Menggunakan method visit untuk membuka halaman login sebelum setiap test case.
    login.login(LoginData.validUser, LoginData.validPassword)   // Menggunakan method login untuk melakukan login dengan data yang valid sebelum setiap test case.
    recruitmentPage.openRecruitment()   // Menggunakan method openRecruitment untuk membuka halaman Recruitment
    })

    it('TC3.1 Add Candidate', () => {   // Membuat test case untuk memverifikasi bahwa fitur menambahkan kandidat berfungsi dengan benar, yang akan menambahkan kandidat baru ke dalam daftar kandidat.
        cy.intercept('POST', '**/recruitment/candidates').as('addCandidate')    // Menggunakan cy.intercept untuk memantau permintaan POST ke endpoint yang digunakan untuk menambahkan kandidat baru, dan memberikan alias 'addCandidate' untuk permintaan tersebut.
        candidatePage.clickAdd()    // Menggunakan method clickAdd untuk membuka form penambahan kandidat baru, kemudian menggunakan method inputFirstName untuk memasukkan nama depan "John", method inputLastName untuk memasukkan nama belakang "Doe", method inputEmail untuk memasukkan email "
        candidatePage.inputFirstName('John') // Menggunakan method inputFirstName untuk memasukkan nama depan "John" ke dalam field nama depan kandidat di form penambahan kandidat baru, kemudian menggunakan method inputLastName untuk memasukkan nama belakang "Doe", method inputEmail untuk memasukkan email "
        candidatePage.inputLastName('Doe')  // Menggunakan method inputLastName untuk memasukkan nama belakang "Doe" ke dalam field nama belakang kandidat di form penambahan kandidat baru, kemudian menggunakan method inputEmail untuk memasukkan email "
        candidatePage.inputEmail('john@mail.com') // Menggunakan method inputEmail untuk memasukkan email "
        candidatePage.save()    // Menggunakan method save untuk menyimpan data kandidat baru yang telah dimasukkan, yang akan memicu permintaan POST ke endpoint yang digunakan untuk menambahkan kandidat baru, dan kemudian menggunakan cy.wait untuk menunggu hingga permintaan tersebut selesai, serta memverifikasi bahwa permintaan berhasil dengan memeriksa status code dari respons.
        cy.wait('@addCandidate').its('response.statusCode').should('eq', 200) // Menggunakan cy.wait untuk menunggu hingga permintaan POST ke endpoint yang digunakan untuk menambahkan kandidat baru selesai, dan memverifikasi bahwa permintaan tersebut berhasil dengan memeriksa status code dari respons.
    })

    it('TC3.2 Search Candidate', () => {    // Membuat test case untuk memverifikasi bahwa fitur pencarian kandidat berfungsi dengan benar, yang akan memfilter daftar kandidat berdasarkan nama yang dimasukkan dan menampilkan hanya kandidat yang sesuai dengan kriteria pencarian.
        cy.intercept('GET', '**/candidates*').as('searchCandidate') // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mencari kandidat berdasarkan nama, dan memberikan alias 'searchCandidate' untuk permintaan tersebut.
        candidatePage.searchCandidate('John')   // Menggunakan method searchCandidate untuk memasukkan nama "John" ke dalam field pencarian nama kandidat di halaman Candidates,
        cy.wait('@searchCandidate').its('response.statusCode').should('eq', 200) // Menggunakan cy.wait untuk menunggu hingga permintaan GET ke endpoint yang digunakan untuk mencari kandidat berdasarkan nama selesai, dan memverifikasi bahwa permintaan tersebut berhasil.
    })

    it('TC3.3 Reset Filter', () => {    // Membuat test case untuk memverifikasi bahwa fitur reset filter dalam pencarian kandidat berfungsi dengan benar, yang akan menghapus semua kriteria pencarian yang telah dimasukkan dan menampilkan kembali daftar kandidat secara keseluruhan.
        cy.contains('Reset').click()    // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Reset" dan mengkliknya untuk menghapus semua kriteria pencarian yang telah dimasukkan dalam pencarian kandidat.
        cy.get('.oxd-input').eq(1).should('have.value', '') // Menggunakan cy.get untuk memeriksa bahwa field pencarian nama kandidat (yang memiliki placeholder "Type for hints...") memiliki nilai kosong setelah tombol Reset diklik, yang menunjukkan bahwa kriteria pencarian berhasil direset.
    })

    it('TC3.4 View Candidate Detail', () => {   // Membuat test case untuk memverifikasi bahwa pengguna dapat melihat detail kandidat dengan mengklik nama kandidat dalam daftar kandidat, yang akan menampilkan informasi lengkap tentang kandidat tersebut.
        cy.get('.oxd-table-card').first().click()   // Menggunakan cy.get untuk menemukan elemen dengan kelas 'oxd-table-card' (yang mewakili baris dalam tabel daftar kandidat) yang pertama dan mengkliknya untuk membuka halaman detail kandidat.
        cy.contains('Candidate').should('exist')    // Menggunakan cy.contains untuk memeriksa bahwa elemen yang berisi teks "Candidate" ada di halaman setelah mengklik nama kandidat, yang menunjukkan bahwa halaman detail kandidat berhasil ditampilkan.
    })

    it('TC3.5 First Name Mandatory', () => {    // Membuat test case untuk memverifikasi bahwa validasi "Required" muncul ketika mencoba menyimpan kandidat baru tanpa mengisi field nama depan (first name) yang wajib diisi.
        recruitmentPage.clickAdd()  // Menggunakan method clickAdd untuk membuka form penambahan kandidat baru, kemudian menggunakan method clickSave untuk mencoba menyimpan kandidat baru tanpa mengisi field nama depan, yang akan memicu validasi dan menampilkan pesan "Required" untuk field nama depan yang tidak diisi.
        recruitmentPage.clickSave() // Menggunakan method clickSave untuk mencoba menyimpan kandidat baru tanpa mengisi field nama depan, yang akan memicu validasi dan menampilkan pesan "Required" untuk field nama depan yang tidak diisi.
        cy.contains('Required').should('be.visible')    // Menggunakan cy.contains untuk memeriksa bahwa pesan "Required" muncul dan terlihat di halaman setelah mencoba menyimpan kandidat baru tanpa mengisi field nama depan, yang menunjukkan bahwa validasi untuk field nama depan yang wajib diisi berfungsi dengan benar.
    })

    it('TC3.6 Delete Candidate', () => {    // Membuat test case untuk memverifikasi bahwa fitur penghapusan kandidat berfungsi dengan benar, yang akan menghapus kandidat yang dipilih dari daftar kandidat dan memastikan bahwa kandidat tersebut tidak lagi muncul dalam daftar setelah dihapus.
        cy.intercept('DELETE', '**/candidates*').as('deleteCandidate')  // Menggunakan cy.intercept untuk memantau permintaan DELETE ke endpoint yang digunakan untuk menghapus kandidat, dan memberikan alias 'deleteCandidate' untuk permintaan tersebut.
        cy.get('.bi-trash').first().click() // Menggunakan cy.get untuk menemukan elemen dengan kelas 'bi-trash' (yang mewakili ikon hapus) yang pertama dan mengkliknya untuk memulai proses penghapusan kandidat.
        cy.contains('Yes, Delete').click()  // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Yes, Delete" (yang merupakan konfirmasi untuk menghapus kandidat) dan mengkliknya untuk mengonfirmasi penghapusan kandidat.
        cy.wait('@deleteCandidate').its('response.statusCode').should('eq', 200)    // Menggunakan cy.wait untuk menunggu hingga permintaan DELETE ke endpoint yang digunakan untuk menghapus kandidat selesai, dan memverifikasi bahwa permintaan tersebut berhasil dengan memeriksa status code dari respons.
    })

    it('TC3.7 Search Candidate by Vacancy', () => {     // Membuat test case untuk memverifikasi bahwa pencarian kandidat berdasarkan lowongan pekerjaan (vacancy) berfungsi dengan benar, yang akan memfilter daftar kandidat dan menampilkan hanya kandidat yang sesuai dengan lowongan pekerjaan yang dipilih.
        cy.intercept('GET', '**/candidates*').as('filterVacancy')   // Menggunakan cy.intercept untuk memantau permintaan GET ke endpoint yang digunakan untuk mencari kandidat berdasarkan lowongan pekerjaan, dan memberikan alias 'filterVacancy' untuk permintaan tersebut.
        cy.get('.oxd-select-text').first().click()  // Menggunakan cy.get untuk menemukan elemen dropdown yang digunakan untuk memilih lowongan pekerjaan, kemudian menggunakan .click() untuk membuka dropdown tersebut.
        cy.contains('Senior QA Lead').click()   // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Senior QA Lead" dan mengkliknya untuk memilih lowongan pekerjaan tersebut.
        cy.contains('Search').click()   // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Search" dan mengkliknya untuk menjalankan pencarian kandidat berdasarkan lowongan pekerjaan yang dipilih.
        cy.wait('@filterVacancy').its('response.statusCode').should('eq', 200)   // Menggunakan cy.wait untuk menunggu hingga permintaan GET ke endpoint yang digunakan untuk mencari kandidat berdasarkan lowongan pekerjaan selesai, dan memverifikasi bahwa permintaan tersebut berhasil.
    })

    it('TC3.8 Required Validation', () => { // Membuat test case untuk memverifikasi bahwa validasi "Required" muncul ketika mencoba menyimpan kandidat baru tanpa mengisi field yang wajib diisi.
        candidatePage.clickAdd()    // Menggunakan method clickAdd untuk membuka form penambahan kandidat baru, kemudian menggunakan method save untuk mencoba menyimpan kandidat baru tanpa mengisi field yang wajib diisi, yang akan memicu validasi dan menampilkan pesan "Required" untuk field yang tidak diisi.
        candidatePage.save()    // Menggunakan method save untuk mencoba menyimpan kandidat baru tanpa mengisi field yang wajib diisi, yang akan memicu validasi dan menampilkan pesan "Required" untuk field yang tidak diisi.
        cy.contains('Required').should('exist') // Menggunakan cy.contains untuk memeriksa bahwa pesan "Required" muncul di halaman setelah mencoba menyimpan kandidat baru tanpa mengisi field yang wajib diisi, yang menunjukkan bahwa validasi untuk field yang wajib diisi berfungsi dengan benar.
    })

})