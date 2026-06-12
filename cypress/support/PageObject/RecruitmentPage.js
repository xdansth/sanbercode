class RecruitmentPage 
{

  openRecruitment() 
    {
    cy.contains('Recruitment').click()
    }

  openCandidates() 
    {
    cy.contains('Candidates').click()
    }

}

export default new RecruitmentPage()