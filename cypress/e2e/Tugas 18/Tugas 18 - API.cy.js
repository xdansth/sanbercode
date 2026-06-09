describe('Tugas 18 - API Testing', () => {
    it('TC2.1 - GET All Users', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body.length).to.be.greaterThan(0)
          })
      })

      it('TC2.2 - GET User by ID', () => {
        const userId = 1
        cy.request('GET', `https://api.escuelajs.co/api/v1/categories/${userId}`)
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.id).to.eq(userId)
          })
      })

      it('TC2.3 - POST Create New User', () => {
        const newUser = {
          name: 'John Doe',
          description: 'A new category',
          image: 'https://example.com/image.jpg'
        }
        cy.request('POST', 'https://api.escuelajs.co/api/v1/categories', newUser)
          .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.be.an('object')
            expect(response.body.name).to.eq(newUser.name)
            expect(response.body.description).to.eq(newUser.description)
            expect(response.body.image).to.eq(newUser.image)
          })
      })

      it('TC2.4 - PUT Update User', () => {
        const userId = 1
        const updatedUser = {
          name: 'Jane Doe',
          description: 'An updated category',
          image: 'https://example.com/updated-image.jpg'
        }
        cy.request('PUT', `https://api.escuelajs.co/api/v1/categories/${userId}`, updatedUser)
          .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('object')
            expect(response.body.name).to.eq(updatedUser.name)
            expect(response.body.description).to.eq(updatedUser.description)
            expect(response.body.image).to.eq(updatedUser.image)
          })
      })

      it('TC2.5 - DELETE User', () => {
        const userId = 1
        cy.request('DELETE', `https://api.escuelajs.co/api/v1/categories/${userId}`)
          .then((response) => {
            expect(response.status).to.eq(204)
          })
      })
      it('TC2.6 - GET Non-Existent User', () => {
        const userId = 9999
        cy.request({
          method: 'GET',
          url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
      it('TC2.7 - POST Create User with Invalid Data', () => {
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
          expect(response.status).to.eq(400)
        })
      })
      it('TC2.8 - PUT Update Non-Existent User', () => {
        const userId = 9999
        const updatedUser = {
          name: 'Non-Existent User',
          description: 'Trying to update a non-existent user',
          image: 'https://example.com/non-existent-image.jpg'
        }
        cy.request({
          method: 'PUT',
          url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
          body: updatedUser,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
      it('TC2.9 - DELETE Non-Existent User', () => {
        const userId = 9999
        cy.request({
          method: 'DELETE',
          url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
      it('TC2.10 - GET Users with Query Parameters', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.escuelajs.co/api/v1/categories',
          qs: {
            limit: 5,
            offset: 0
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array')
          expect(response.body.length).to.be.lessThanOrEqual(5)
        })
      })
      it('TC2.11 - GET Users with Invalid Query Parameters', () => {
        cy.request({
          method: 'GET',
          url: 'https://api.escuelajs.co/api/v1/categories',
          qs: {
            limit: -1,
            offset: -1
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(400)
        })
        })
        it('TC2.12 - POST Create User with Missing Fields', () => {
          const incompleteUser = {
            description: 'Missing name field',
            image: 'https://example.com/incomplete-image.jpg'
          }
          cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories',
            body: incompleteUser,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(400)
          })
        })
        it('TC2.13 - PUT Update User with Invalid Data', () => {
          const userId = 1
          const invalidUpdate = {
            name: '',
            description: 'Invalid update',
            image: 'https://example.com/invalid-update-image.jpg'
          }
          cy.request({
            method: 'PUT',
            url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
            body: invalidUpdate,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(400)
          })
        })
        it('TC2.14 - DELETE User with Invalid ID', () => {
          const invalidUserId = 'invalid-id'
          cy.request({
            method: 'DELETE',
            url: `https://api.escuelajs.co/api/v1/categories/${invalidUserId}`,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(400)
          })
        })
        it('TC2.15 - GET Users with Invalid Endpoint', () => {
          cy.request({
            method: 'GET',
            url: 'https://api.escuelajs.co/api/v1/invalid-endpoint',
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(404)
          })
        })
        it('TC2.16 - POST Create User with Duplicate Data', () => {
          const duplicateUser = {
            name: 'John Doe',
            description: 'A duplicate category',
            image: 'https://example.com/duplicate-image.jpg'
          }
          cy.request('POST', 'https://api.escuelajs.co/api/v1/categories', duplicateUser)
            .then((response) => {
              expect(response.status).to.eq(201)
              cy.request({
                method: 'POST',
                url: 'https://api.escuelajs.co/api/v1/categories',
                body: duplicateUser,
                failOnStatusCode: false
              }).then((response) => {
                expect(response.status).to.eq(400)
              })
            })
        })
        it('TC2.17 - PUT Update User with Duplicate Data', () => {
          const userId = 1
          const duplicateUpdate = {
            name: 'Jane Doe',
            description: 'A duplicate update',
            image: 'https://example.com/duplicate-update-image.jpg'
          }
          cy.request('PUT', `https://api.escuelajs.co/api/v1/categories/${userId}`, duplicateUpdate)
            .then((response) => {
              expect(response.status).to.eq(200)
              cy.request({
                method: 'PUT',
                url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
                body: duplicateUpdate,
                failOnStatusCode: false
              }).then((response) => {
                expect(response.status).to.eq(400)
              })
            })
        })
        it('TC2.18 - DELETE User with Valid ID', () => {
          const userId = 1
          cy.request('DELETE', `https://api.escuelajs.co/api/v1/categories/${userId}`)
            .then((response) => {
              expect(response.status).to.eq(204)
            })
        })
        it('TC2.19 - GET Users After Deletion', () => {
          const userId = 1
          cy.request({
            method: 'GET',
            url: `https://api.escuelajs.co/api/v1/categories/${userId}`,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(404)
          })
        })
        it('TC2.20 - POST Create User with Large Payload', () => {
          const largeUser = {
            name: 'Large User',
            description: 'A user with a very large description'.repeat(100),
            image: 'https://example.com/large-user-image.jpg'
          }
          cy.request({
            method: 'POST',
            url: 'https://api.escuelajs.co/api/v1/categories',
            body: largeUser,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(201)
          })
        })
})