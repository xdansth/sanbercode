class DirectoryPage {   // Membuat kelas DirectoryPage yang akan berisi metode untuk berinteraksi dengan halaman Directory

openDirectory()     // Membuat metode openDirectory untuk membuka halaman Directory
    {
    cy.contains('Directory').click()    // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Directory" dan mengkliknya untuk membuka halaman Directory
    }

employeeName(name)  // Membuat metode employeeName untuk memasukkan nama karyawan yang ingin dicari dalam field pencarian nama karyawan di halaman Directory
    {
    cy.get('.oxd-autocomplete-text-input input').first().clear().type(name) // Menggunakan cy.get untuk menemukan elemen input yang digunakan untuk mencari karyawan berdasarkan nama (yang memiliki kelas 'oxd-autocomplete-text-input' dan merupakan input pertama), kemudian menggunakan .clear() untuk menghapus teks yang sudah ada di input tersebut dan .type(name) untuk memasukkan nama karyawan yang ingin dicari.
    }

selectJobTitle(jobTitle)    // Membuat metode selectJobTitle untuk memilih jabatan dalam pencarian karyawan di halaman Directory
    {
    cy.get('.oxd-select-text').eq(0).click()    // Menggunakan cy.get untuk menemukan elemen dropdown yang digunakan untuk memilih jabatan, kemudian menggunakan .eq(0) untuk memilih dropdown pertama (karena ada beberapa dropdown di halaman), lalu menggunakan .click() untuk membuka dropdown tersebut, dan terakhir menggunakan cy.contains(jobTitle).click() untuk menemukan opsi yang sesuai dengan nama jabatan yang ingin dipilih dan mengkliknya.
    cy.contains(jobTitle).click()   // Menggunakan cy.contains untuk menemukan elemen yang berisi teks yang sesuai dengan nama jabatan yang ingin dipilih, kemudian menggunakan .click() untuk mengklik opsi tersebut dalam dropdown.
    }

selectLocation(location)    // Membuat metode selectLocation untuk memilih lokasi dalam pencarian karyawan di halaman Directory
    {
    cy.get('.oxd-select-text').eq(1).click()    // Menggunakan cy.get untuk menemukan elemen dropdown yang digunakan untuk memilih lokasi, kemudian menggunakan .eq(1) untuk memilih dropdown kedua (karena ada beberapa dropdown di halaman), lalu menggunakan .click() untuk membuka dropdown tersebut, dan terakhir menggunakan cy.contains(location).click() untuk menemukan opsi yang sesuai dengan nama lokasi yang ingin dipilih dan mengkliknya.
    cy.contains(location).click()   // Menggunakan cy.contains untuk menemukan elemen yang berisi teks yang sesuai dengan nama lokasi yang ingin dipilih, kemudian menggunakan .click() untuk mengklik opsi tersebut dalam dropdown.
    }

clickSearch()   // Membuat metode clickSearch untuk mengklik tombol Search setelah memasukkan kriteria pencarian karyawan, yang akan memicu pencarian karyawan berdasarkan kriteria yang telah dimasukkan.
    {
    cy.contains('Search').click()   // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Search" dan mengkliknya untuk melakukan pencarian karyawan berdasarkan kriteria yang telah dimasukkan.
    }

clickReset()    // Membuat metode clickReset untuk mengklik tombol Reset setelah melakukan pencarian dengan beberapa filter, yang akan menghapus semua kriteria pencarian yang telah dimasukkan.
    {
    cy.contains('Reset').click()    // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Reset" dan mengkliknya untuk menghapus semua kriteria pencarian yang telah dimasukkan.
    cy.get('input[placeholder="Type for hints..."]').clear()    // Menggunakan cy.get untuk menemukan elemen input yang memiliki placeholder "Type for hints..." (yang digunakan untuk mencari karyawan berdasarkan nama), kemudian menggunakan .clear() untuk menghapus teks yang sudah ada di input tersebut setelah tombol Reset diklik, memastikan bahwa field pencarian nama karyawan kembali kosong.
    }

}

export default new DirectoryPage()  // Mengekspor instance baru dari kelas DirectoryPage sehingga dapat digunakan di file test lainnya