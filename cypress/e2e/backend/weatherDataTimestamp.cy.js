describe('Weather Data for Timestamp Tests', () => {
    //const apiKey = 'Replace_with_your_actual_API_key'
    const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall/timemachine';

    it('handles correct API call for Weather Data for Timestamp', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&dt=1700155846&appid=${apiKey}&units=metric&lang=en`,
        }).then((response) => {
            expect(response.status).to.equal(200);

        });
    });

    it('handles 400 Bad Request for a out of range timestamp', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&dt=170015584600&appid=${apiKey}&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '400 Bad Request is expected for out of range timestamp').to.eq(400);
            expect(response.body).to.have.property('cod', '400');
            expect(response.body).to.have.property('message', "The requested time is out the available range. Please check possible time range in the product documentation page"); // Check the error message

        });
    });

    it('handles 400 Bad Request for invalid timestamp', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&dt=invalid_timestamp&appid=${apiKey}&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '400 Bad Request is expected for invalid timestamp').to.eq(400);
            expect(response.body).to.have.property('cod', '400');
            expect(response.body).to.have.property('message', "wrong dt");

        });
    });

    it('handles 401 Unauthorized for invalid API key', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&dt=1700155846&appid=invalid_api_key&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '401 Unauthorized is expected for invalid API key').to.eq(401);
            expect(response.body).to.have.property('cod', 401);
            expect(response.body).to.have.property('message', "Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price. If you have a valid subscription to the One Call by Call plan, but still receive this error, then please see https://openweathermap.org/faq#error401 for more info.");

        });
    });

    it('handles 404 Not Found for invalid endpoint', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/invalid_endpoint?lat=-27.5969&lon=-48.5495&dt=1700155846&appid=${apiKey}&units=metric&lang=en`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '404 Not Found is expected for invalid endpoint').to.eq(404);
            expect(response.body).to.have.property('cod', '404');
            expect(response.body).to.have.property('message', "Internal error"); // The API returns the message Internal error instead of Not Found

        });
    });


});