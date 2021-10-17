describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3003')

    cy.request('POST', 'http://localhost:3010/api/testing/reset')

    const user = {
      name: 'Luisin',
      username: 'sauterdev',
      password: 'sauterdev123'
    }

    cy.request('POST', 'http://localhost:3010/api/users', user)
  })
  it('frontpage ca be opened', () => {
    cy.contains(/notes/i)
  })

  it('login form can be open', () => {
    cy.contains(/show login/i).click()
  })

  it('user can login', () => {
    cy.contains(/show login/i).click()
    // cy.get('input:first').type('satulio') //las dos formas
    // cy.get('input').first().type('satulio')
    cy.get('[placeholder="username"]').type('sauterdev')
    // cy.get('input:last').type('123456') //last element
    cy.get('[placeholder="password"]').type('sauterdev123')
    cy.contains(/login/i).click()
    cy.contains('show create note').click()
    cy.get('[placeholder="write a new note"]')
  })

  it('login fail with wrong password', () => {
    cy.contains(/show login/i).click()
    cy.get('[placeholder="username"]').type('sauterdev')
    cy.get('[placeholder="password"]').type('sauterdasdsad')
    cy.contains(/login/i).click()
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'sauterdev',
        password: 'sauterdev123'
      })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('show create note').click()
      cy.get('[placeholder="write a new note"]')
      cy.get('input').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'This is the firts note',
          important: false
        })

        cy.createNote({
          content: 'This is the second note',
          important: true
        })

        cy.createNote({
          content: 'This is the third note',
          important: false
        })
      })

      it('it can be made important', () => {
        cy.contains('This is the second note').as('theNote')

        cy.get('@theNote')
          .contains('make not important')
          .click()

        cy.get('@theNote')
          .contains('make important')
      })

      it('show only important', () => {
        cy.contains(/show only important/i).click()
        cy.contains(/show all/i).click()
      })
    })
  })
})
