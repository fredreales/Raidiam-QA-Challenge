describe('Daily Aggregation Tests', () => {
    //const apiKey = 'Replace_with_your_actual_API_key'
    const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall/day_summary';

    it('handles correct API call for Daily Aggregation', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&date=2023-11-13&units=metric&appid=${apiKey}`,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('humidity');
            expect(response.body).to.have.property('precipitation');
            expect(response.body).to.have.property('temperature');
        });
    });

    it('handles 400 Bad Request for invalid parameters', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=200&lon=-48.5495&date=2023-11-13&units=metric&appid=${apiKey}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '400 Bad Request is expected for invalid parameters').to.eq(400);
            expect(response.body).to.have.property('code', '400');
            expect(response.body).to.have.property('message', "The valid range of latitude in degrees is -90 and +90 for the southern and northern hemisphere, respectively");
        });
    });

    it('handles 400 Bad Request for invalid data range', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&date=2055-11-13&units=metric&appid=${apiKey}`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '400 Bad Request is expected for invalid parameters').to.eq(400);
            expect(response.body).to.have.property('code', '400');
            expect(response.body).to.have.property('message', "Invalid data depth. The available data depth is from 1979-01-02 till 2025-05-09.");
        });
    });

    it('handles 401 Unauthorized for invalid API Key', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}?lat=-27.5969&lon=-48.5495&date=2023-11-13&units=metric&appid=invalid_api_key`,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status, '401 Unauthorized is expected for invalid API Key').to.eq(401);
            expect(response.body).to.have.property('cod', 401);
            expect(response.body).to.have.property('message', "Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price. If you have a valid subscription to the One Call by Call plan, but still receive this error, then please see https://openweathermap.org/faq#error401 for more info.");
        });
    });
});
