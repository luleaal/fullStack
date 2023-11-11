
describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'lucia leon',
      username: 'luleaal',
      password: 'password'
    }
    const user2 = {
      name: 'user 2',
      username: 'user2',
      password: 'password2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.request('POST', 'http://localhost:3001/api/users/', user2) 
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('luleaal')
    cy.get('#password').type('password')
    cy.get('#loginSubmit').click()

    cy.contains('luleaal logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('luleaal')
      cy.get('#password').type('password')
      cy.get('#loginSubmit').click()
    })

    it('a new blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Title of cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://titleofcypress.com')
      cy.get('#createSubmit').click()
      cy.contains('Title of cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('Create blog').click()
        cy.get('#title').type('Another title of cypress')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('http://anothertitleofcypress.com')
        cy.get('#createSubmit').click()
      })

      it('view details', function () {
        cy.contains('view').click()
        cy.contains('http://anothertitleofcypress.com')
      })

      describe('details', function () {
        beforeEach(function() {
          cy.contains('view').click()
        })
  
        it('likes are default to 0', function () {
          cy.contains('Likes: 0')
        })
 
        // it('can like the post', function () {
        //   cy.contains('Like').click()
        //   cy.contains('Likes: 1')
        // })

        it('can delete the blog', function () {
          cy.contains('Remove').click()
          cy.reload()
          cy.contains('login').click()
          cy.get('#username').type('luleaal')
          cy.get('#password').type('password')
          cy.get('#loginSubmit').click()
          cy.contains('Another title of cypress').should('not.exist')
        })

        it('does not show delete button for blogs created by other users', function() {
          
          cy.contains('Remove').click()
          cy.reload()
          cy.contains('login').click()
          cy.get('#username').type('user2')
          cy.get('#password').type('password2')
          cy.get('#loginSubmit').click()

          cy.contains('Create blog').click()
          cy.get('#title').type('Blog by another user')
          cy.get('#author').type('user 2')
          cy.get('#url').type('http://blogbyanotheruser.com')
          cy.get('#createSubmit').click()
          cy.contains('Blog by another user')

          cy.contains('Log out').click()

          cy.contains('login').click()
          cy.get('#username').type('luleaal')
          cy.get('#password').type('password')
          cy.get('#loginSubmit').click()
          
          cy.contains('Blog by another user').click()
          cy.contains('view').click()
          cy.contains('Remove').should('not.exist')
        })
      })
    })

    it('two blogs can be added', function() {
          
      cy.contains('Create blog').click()
      cy.get('#title').type('Title of cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://titleofcypress.com')
      cy.get('#createSubmit').click()
      cy.wait(5000)
      cy.get('.blog:contains("Title of cypress")').should('have.length', 1);

      cy.contains('Cancel').click()
      cy.contains('Log out').click()
      cy.contains('login').click()
      cy.get('#username').type('luleaal')
      cy.get('#password').type('password')
      cy.get('#loginSubmit').click()
      cy.contains('Create blog').click()
      cy.get('#title').type('Another title of cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://anothertitleofcypress.com')
      cy.get('#createSubmit').click()
      cy.wait(5000)
      cy.get('.blog:contains("Another title of cypress")', { timeout: 10000 }).should('have.length', 1);
    })

    it('likes order', function () {
      cy.contains('Create blog').click();
      cy.get('#title').type('Title of cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('http://titleofcypress.com');
      cy.get('#createSubmit').click();
      cy.wait(5000);
      cy.get('.blog:contains("Title of cypress")').should('have.length', 1);
    
      cy.contains('Cancel').click();
      cy.contains('Log out').click();
      cy.contains('login').click();
      cy.get('#username').type('luleaal');
      cy.get('#password').type('password');
      cy.get('#loginSubmit').click();
    
      cy.contains('Create blog').click();
      cy.get('#title').type('Another title of cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('http://anothertitleofcypress.com');
      cy.get('#createSubmit').click();
      cy.wait(5000);
      cy.get('.blog:contains("Another title of cypress")').should('have.length', 1);
    
      cy.contains('Title of cypress').parent().find('button#viewButton').eq(0).click();
    
      cy.get('.blog:contains("Title of cypress")').should('be.visible')
        .find('button#likeButton').eq(0).should('be.visible').click();
        
      cy.get('.blog').eq(0).should('contain', 'Title of cypress')
      cy.get('.blog').eq(1).should('contain', 'Another title of cypress')

    }); 
    
 }) 
})