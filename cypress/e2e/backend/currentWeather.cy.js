describe('Current and Forecasts Weather Data Tests', () => {
    //const apiKey = 'Replace_with_your_actual_API_key'
    const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall';


    it('should get forecast weather data', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&exclude=minutely&units=metric&lang=en&appid=${apiKey}`,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('current');
            expect(response.body).to.have.property('daily');
        });
    });

    it('handles 400 Bad Request for invalid coordinates', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=invalid_lat&lon=invalid_lon&exclude=minutely,daily&appid=${apiKey}&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '400 Bad Request is expected for invalid coordinates').to.eq(400);
            expect(response.body).to.have.property('cod', '400');
            expect(response.body).to.have.property('message', 'wrong latitude');
        });
    });

    it('handles 401 Unauthorized for invalid API Key', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.594870&lon=-48.548222&exclude=minutely,daily&appid=invalid_api_key&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '401 Unauthorized is expected for invalid API Key').to.eq(401);
            expect(response.body).to.have.property('cod', 401);
            expect(response.body).to.have.property('message', "Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price. If you have a valid subscription to the One Call by Call plan, but still receive this error, then please see https://openweathermap.org/faq#error401 for more info.");
        });
    });

    it('handles 404 Not Found for invalid endpoint', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/invalid_endpoint?lat=-27.594870&lon=-48.548222&exclude=minutely,daily&appid=${apiKey}&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '404 Not Found is expected for invalid endpoint').to.eq(404);
            expect(response.body).to.have.property('cod', '404');
            expect(response.body).to.have.property('message', "Internal error");

        });
    });
});