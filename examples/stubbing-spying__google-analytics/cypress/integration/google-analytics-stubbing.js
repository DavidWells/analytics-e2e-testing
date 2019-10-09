/* global Cypress, cy */

// Taken from https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/stubbing-spying__google-analytics

Cypress.on('window:before:load', (win) => {
  // because this is called before any scripts
  // have loaded - the ga function is undefined
  // so we need to create it.
  // win.ga = cy.stub().as('ga')
})

// https://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html#Stubs

describe('Google Analytics', function () {
  beforeEach(function () {
    cy.visit('/index.html')
  })

  it('can ensure window.ga is called correctly', function () {
    // cy.wait(500)
    // wait until a global variable has an expected value

    cy.waitUntil(() => cy.window().then((win) => {
      // Wait for real google analytics to load
      return (typeof win.ga === 'function')
    }))

    /*
      Attach spy to real google analytics? win.ga

      But how? 🤔
     */

    // const spy = cy.spy(obj, 'foo').as('anyArgs')

    cy
      .get('@ga')
      // ensure GA was created with our google analytics ID
      .should('be.calledWith', 'create', 'UA-126647663-3', 'auto')
      // and ensure that the initial pageview was sent
      .and('be.calledWith', 'send', 'pageview')

    // now click the anchor tag which causes a hashchange event
    cy.contains('#page2').click()

    cy.hash().should('equal', '#page2')

    // make sure GA was sent this pageview
    cy.get('@ga')
      .should('be.calledWith', 'set', 'page')
      .and('be.calledWith', 'send', 'pageview')

    // and now do it again for page3
    cy.contains('#page3').click()
    cy.hash().should('equal', '#page3')
    cy.get('@ga')
      .should('be.calledWith', 'set', 'page')
      .and('be.calledWith', 'send', 'pageview')
  })
})
