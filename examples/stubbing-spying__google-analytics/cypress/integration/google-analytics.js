/* global Cypress, cy, assert */

// https://docs.cypress.io/guides/references/assertions.html#Sinon-Chai

describe('Google Analytics', function () {
  beforeEach(function () {
    cy.visit('/index.html')
  })

  it('can ensure window.ga is called correctly', function () {

    cy.waitUntil(() => cy.window().then((win) => {
      // Wait for real google analytics to load
      return (typeof win.ga === 'function')
    }))

    cy.window().then((win) => {
      /* Spy on window global ‘ga' */
      cy.spy(win, 'ga').as('ga')

      cy.spy(win.Analytics, 'page').as('pageSpy')

      /* HACK to verify first page view. First analytics.page is called before cypress spy attaches ¯\_(ツ)_/¯ */
      assert.isTrue(win.firstPageViewTriggered, 'this val is true')

      /* initialization already happened
      cy
        .get('@ga')
        // ensure GA was created with our google analytics ID
        .should('be.calledWith', 'create', 'UA-126647663-3', 'auto')
        // and ensure that the initial pageview was sent
        .and('be.calledWith', 'send', 'pageview')
      */

      /* Navigate to other page */
      cy.contains('#page2').click()

      /* Assert analytics.page called once (twice) */
      cy.get('@pageSpy').should('to.be.calledOnce')

      /* Ensure hash is correct */
      cy.hash().should('equal', '#page2')

      /* make sure GA was sent this pageview */
      cy.get('@ga')
      .should('be.calledWith', 'set', 'page')
      .and('be.calledWith', 'send', 'pageview')

      /* Navigate to other page */
      cy.contains('#page3').click()
      /* Ensure hash is correct */
      cy.hash().should('equal', '#page3')
      /* Assert analytics.page called twice (thrice) */
      cy.get('@pageSpy').should('to.be.calledTwice')

      /* make sure GA was sent this pageview */
      cy.get('@ga')
      .should('be.calledWith', 'set', 'page')
      .and('be.calledWith', 'send', 'pageview')

    })
  })
})
