class RecruitmentPage   // Membuat kelas RecruitmentPage yang akan berisi metode untuk berinteraksi dengan halaman Recruitment
{

  openRecruitment()   // Membuat metode openRecruitment untuk membuka halaman Recruitment
    {
    cy.contains('Recruitment').click()  // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Recruitment" dan mengkliknya untuk membuka halaman Recruitment
    }

  clickAdd()  // Membuat metode clickAdd untuk mengklik tombol Add
    {
        cy.contains('Add').click(); // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Add" dan mengkliknya untuk membuka form penambahan kandidat baru
    }

  clickSave()   // Membuat metode clickSave untuk mengklik tombol Save
    {
        cy.contains('Save').click();  // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Save" dan mengkliknya untuk menyimpan data kandidat baru yang telah dimasukkan
    }

  openCandidates()  // Membuat metode openCandidates untuk membuka halaman Candidates
    {
    cy.contains('Candidates').click() // Menggunakan cy.contains untuk menemukan elemen yang berisi teks "Candidates" dan mengkliknya untuk membuka halaman daftar kandidat yang telah ada
    }

}

export default new RecruitmentPage()  // Mengekspor instance baru dari kelas RecruitmentPage sehingga dapat digunakan di file test lainnya