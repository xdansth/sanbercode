class CandidatePage {       // Membuat kelas CandidatePage yang akan berisi metode untuk berinteraksi dengan halaman Candidates

clickAdd()  // Membuat metode clickAdd untuk mengklik tombol Add
    {
    cy.contains('Add').click()  // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Add" dan mengkliknya untuk membuka form penambahan kandidat baru
    }

inputFirstName(firstName)   // Membuat metode inputFirstName untuk memasukkan nama depan kandidat yang ingin ditambahkan
    {
    cy.get('input[name="firstName"]').type(firstName)   // Menggunakan cy.get untuk menemukan elemen input yang memiliki atribut name dengan nilai "firstName", kemudian menggunakan .type(firstName) untuk memasukkan nama depan kandidat yang ingin ditambahkan.
    }

inputLastName(lastName)     // Membuat metode inputLastName untuk memasukkan nama belakang kandidat yang ingin ditambahkan
    {
    cy.get('input[name="lastName"]').type(lastName) // Menggunakan cy.get untuk menemukan elemen input yang memiliki atribut name dengan nilai "lastName", kemudian menggunakan .type(lastName) untuk memasukkan nama belakang kandidat yang ingin ditambahkan.
     }

selectVacancy(vacancy)  // Membuat metode selectVacancy untuk memilih lowongan pekerjaan
    {
    cy.get('.oxd-select-text').eq(0).click()    // Menggunakan cy.get untuk menemukan elemen dropdown yang digunakan untuk memilih lowongan pekerjaan, kemudian menggunakan .eq(0) untuk memilih dropdown pertama (karena ada beberapa dropdown di halaman), lalu menggunakan .click() untuk membuka dropdown tersebut, dan terakhir menggunakan cy.contains(vacancy).click() untuk menemukan opsi yang sesuai dengan nama lowongan pekerjaan yang ingin dipilih dan mengkliknya.
    cy.contains(vacancy).click()    // Menggunakan cy.contains untuk menemukan elemen yang berisi teks yang sesuai dengan nama lowongan pekerjaan yang ingin dipilih, kemudian menggunakan .click() untuk mengklik opsi tersebut dalam dropdown.
    }

inputEmail(email)   // Membuat metode inputEmail untuk memasukkan email kandidat yang ingin ditambahkan
    {
    cy.get('input').eq(4).type(email)   // Menggunakan cy.get untuk menemukan elemen input yang digunakan untuk memasukkan email kandidat, kemudian menggunakan .eq(4) untuk memilih input kelima (karena ada beberapa input di halaman), lalu menggunakan .type(email) untuk memasukkan email kandidat yang ingin ditambahkan.
    }

save() // Membuat metode save untuk menyimpan data kandidat baru yang telah dimasukkan
    {
    cy.contains('Save').click() // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Save" dan mengkliknya untuk menyimpan data kandidat baru yang telah dimasukkan
    }

searchCandidate(name)   // Membuat metode searchCandidate untuk mencari kandidat berdasarkan nama
    {
    cy.get('.oxd-input').eq(1).clear().type(name)   // Menggunakan cy.get untuk menemukan elemen input yang digunakan untuk mencari kandidat berdasarkan nama, kemudian menggunakan .eq(1) untuk memilih input kedua (karena ada beberapa input di halaman), lalu menggunakan .clear() untuk menghapus teks yang sudah ada di input tersebut dan .type(name) untuk memasukkan nama kandidat yang ingin dicari.
    cy.contains('Search').click()   // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Search" dan mengkliknya untuk melakukan pencarian kandidat berdasarkan nama yang telah dimasukkan
    }

}

export default new CandidatePage()  // Mengekspor instance baru dari kelas CandidatePage sehingga dapat digunakan di file test lainnya