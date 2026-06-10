describe('Tugas 18 - API Testing', () => {
    it('TC2.1 - GET All Users', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
          .then((response) => {
            expect(response.status).to.be.oneOf([200,201])
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.be.greaterThan(0)
          })
      })

      it('TC2.2 - GET User by ID', () => {
        const userId = 1
        cy.request('GET', `https://api.escuelajs.co/api/v1/categories/${userId}`)
          .then((response) => {
            expect(response.status).to.be.oneOf([200,201])
            expect(response.body).to.be.an('object')
            expect(response.body.id).to.eq(userId)
          })
      })
      it('TC2.3 - GET Non-Existent User', () => {
        const userId = 9999
        cy.request({
          method: 'GET',
          url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([400,404])
        })
      })
      it('TC2.4 - POST Create User with Invalid Data', () => {
        const invalidUser = {
          name: '',
          description: 'Invalid category',
          image: 'https://example.com/invalid-image.jpg'
        }
        cy.request({
          method: 'POST',
          url: 'https://api.escuelajs.co/api/v1/categories',
          body: invalidUser,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([400,404])
        })
      })
      it('TC2.5 - PUT Update Non-Existent User', () => {
        const userId = 9999
        const updatedUser = {
          name: 'Non-Existent User',
          description: 'Trying to update a non-existent user',
          image: 'https://example.com/non-existent-image.jpg'
        }
        cy.request({
          method: 'PUT',
          url: 'https://api.escuelajs.co/api/v1/categories/${userId}',
          body: updatedUser,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([400,404])
        })
      })
      it('TC2.6 - DELETE Non-Existent User', () => {
        const userId = 9999
        cy.request({
          method: 'DELETE',
          url: 'https://api.escuelajs.co/api/v1/categories/${userId}',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([400,404])
        })
      })
      it('TC2.7 - GET Users with Query Parameters', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.escuelajs.co/api/v1/categories',
          qs: {
            limit: 5,
            offset: 0
          }
        }).then((response) => {
          expect(response.status).to.be.oneOf([200,201])
          expect(response.body).to.be.an('array')
          expect(response.body.length).to.be.at.most(5)
        })
      })
      it('TC2.8 - GET Users with Invalid Query Parameters', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.escuelajs.co/api/v1/categories',
          qs: {
            limit: -1,
            offset: -1
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
        })
        it('TC2.9 - PUT Update User with Invalid Data', () => {
          const userId = 1
          const invalidUpdate = {
            name: '',
            description: 'Invalid update',
            image: 'https://example.com/invalid-update-image.jpg'
          }
          cy.request({
            method: 'PUT',
            url: 'https://api.escuelajs.co/api/v1/categories/${userId}',
            body: invalidUpdate,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([400,404])
          })
        })
        it('TC2.10 - DELETE User with Invalid ID', () => {
          const invalidUserId = 'invalid-id'
          cy.request({
            method: 'DELETE',
            url: 'https://api.escuelajs.co/api/v1/categories/${invalidUserId}',
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([400,404])
          })
        })
        it('TC2.11 - GET Users with Invalid Endpoint', () => {
          cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/invalid-endpoint',
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([400,404])
          })
        })
        it('TC2.12 - POST Create User with Large Payload', () => {
          const largeUser = {
            name: 'Large User'.repeat(100),
            image: 'https://example.com/large-user-image.jpg'
          }
          cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories',
            body: largeUser,
            failOnStatusCode: false
          }).then((response) => {
            expect([201, 400, 413]).to.include(response.status)
          })
        })
})
