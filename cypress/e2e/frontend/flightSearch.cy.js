describe('Flight Search Functionality', () => {

    it('Performs a basic one way flight search', () => {

        Cypress.on('uncaught:exception', () => {
            return false;
        });

        // Visit the flight search page
        cy.visit('http://phptravels.net/');
        cy.log('Please resolve the CAPTCHA manually.');
        cy.wait(25000)
        cy.get('.header_menu > :nth-child(1) > .nav-link').should('be.visible');
        cy.wait(1000)
        cy.get('.header_menu > :nth-child(1) > .nav-link').should('exist').click(); //Click on the flights tab
        cy.get('.select2-selection--single').eq(0).click({ force: true });
        cy.get('.select2-search--dropdown .select2-search__field').type('MCO{enter}', { force: true });
        cy.wait(10000)
        cy.get('div.mx-2').contains('Orlando').should('be.visible', { timeout: 5000 }).click();
        cy.wait(3000)
        cy.get('.select2-selection--single').eq(1).click({ force: true });
        cy.get('.select2-search--dropdown .select2-search__field').type('FLN{enter}', { force: true });
        cy.wait(10000)
        cy.get('div.mx-2').contains('Florianopolis').should('be.visible', { timeout: 5000 }).click();
        cy.wait(3000)
        cy.get('.col-md-1 > #flights-search').click({ force: true });
    });
});
