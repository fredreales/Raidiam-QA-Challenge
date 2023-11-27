# Front-End Testing Challenge for PHP Travels Flights

## Overview

This document outlines the approach taken for the front-end testing challenge using the PHP Travels Flights application (https://phptravels.net/). It covers the identification of critical flows, detailed test cases developed, considerations for automation, and bug reporting.

## Local Test Execution Guide

Follow this step-by-step tutorial to run the tests locally:

### 1) Open Terminal:
- **Windows**: Use Command Prompt or PowerShell.
- **macOS/Linux**: Use Terminal.

### 2) Navigate to Your Desired Location:
cd path/to/your/desired/location

### 3) Clone the Repository:
git clone https://github.com/fredreales/Raidiam-QA-Challenge.git

### 4) Change into the Project Directory:
cd Raidiam-QA-Challenge

### 5) Create the `package.json` File:
npm init -y

### 6) Install Cypress:
npm install cypress -D
- The version currently in use is 10.11.0. 
- To install this specific version, run:
npx install cypress@10.11.0 -D

### 7) Run Tests from the Command Line:
npx cypress run

### 8) Open Cypress Test Runner for Interactive Testing:
- Use the following command to open the Cypress Test Runner:
npx cypress open

This guide provides a comprehensive set of instructions for setting up and running the tests locally using Cypress.


## Critical Flows

The PHP Travels Flights application offers several functionalities, each contributing to the overall user experience. While many aspects of the application are important, the focus for this testing challenge is narrowed down to three critical flows. These flows were chosen based on their direct impact on the user journey and business outcomes:

- **Other Potential Flows**: While other flows like user account management, flight comparison features, and customer feedback mechanisms are important, they were considered secondary for this testing scenario.

- **Prioritizing User Journey and Business Impact**: The selected flows represent the core journey of a user - from searching for flights, booking a flight, to making a payment. These are the steps that directly lead to user conversion and revenue generation, making them critical for the business.

### 1. Flight Search Functionality
- **Why Critical**: The primary functionality, allowing users to search for flights based on various criteria.
- **Detailed Test Cases**:
  1. **Search flights with valid criteria**:
     - Navigate to the flight search page.
     - Enter a valid origin in the 'From' field.
     - Enter a valid destination in the 'To' field.
     - Select a future date for departure.
     - Click on the 'Search' button.
     - Verify that the search results are displayed and relevant to the search criteria.
  2. **Search without filling all mandatory fields**:
     - Navigate to the flight search page.
     - Leave the 'From' or 'To' field empty.
     - Attempt to search.
     - Verify that the search is not submitted and an appropriate error message is displayed.
  3. **Search with return date before the departure date**:
     - Navigate to the flight search page.
     - Enter valid 'From' and 'To' locations.
     - Select a departure date and a return date where the return date is before the departure date.
     - Attempt to search.
     - Verify that an error message is displayed about the invalid date selection.
  4. **Search with invalid or nonexistent destinations**:
     - Navigate to the flight search page.
     - Enter a nonexistent location in the 'From' or 'To' field.
     - Complete other fields with valid data and attempt to search.
     - Verify that the search results indicate no flights found or an error message is displayed.

### 2. Flight Booking Process
- **Why Critical**: Essential for converting users into customers through flight bookings.
- **Detailed Test Cases**:
  1. **Complete a booking with all required details**:
     - Perform a successful flight search.
     - Select a flight from the search results.
     - Fill in all required fields for booking (personal details, seat selection, etc.).
     - Submit the booking.
     - Verify that a confirmation page is displayed with booking details.
  2. **Attempt to book without filling all mandatory fields**:
     - Perform a successful flight search.
     - Select a flight and proceed to the booking page.
     - Leave some mandatory fields empty.
     - Attempt to submit the booking.
     - Verify that the submission is prevented and error messages for mandatory fields are shown.
  3. **Select additional options during booking**:
     - Perform a successful flight search.
     - Choose a flight and proceed to the booking options.
     - Select additional options (like extra luggage, meal preferences).
     - Complete the booking process.
     - Verify that the booking confirmation includes the selected additional options.
  4. **Cancel or navigate back during the booking process**:
     - Begin the flight booking process.
     - In the middle of filling out details, choose to cancel or navigate back.
     - Verify that you are redirected appropriately without completing the booking.

### 3. Payment and Reservation Confirmation
- **Why Critical**: Directly impacts revenue, with successful transactions leading to confirmed bookings.
- **Detailed Test Cases**:
  1. **Make a payment with valid credit card details**:
     - Complete the flight booking process.
     - Enter valid credit card details for payment.
     - Submit the payment.
     - Verify that a successful payment confirmation is displayed.
  2. **Attempt to pay with invalid card information**:
     - Reach the payment step in the booking process.
     - Enter invalid credit card details.
     - Attempt to submit the payment.
     - Verify that the payment is declined and an error message is displayed.
  3. **Check for confirmation messages post-payment**:
     - Complete a booking and payment with valid details.
     - After payment, verify that a confirmation message or page is displayed.
     - Ensure the details of the booking and payment are correctly summarized.
  4. **Verify email confirmations (if applicable)**:
     - Complete the booking and payment process.
     - Check the provided email for a confirmation message.
     - Verify that the email contains all relevant details and is received in a timely manner.

## Automation Approach (Optional)

Automating the front-end test cases for the PHP Travels Flights application presented distinct challenges, particularly due to the application's current state and inherent security features like CAPTCHA. This section discusses the approach, limitations, and strategic decisions made during the automation process using Cypress.

### Choice of Tool: Cypress

For this challenge, Cypress was chosen as the automation framework due to its strengths in real-time interactive testing, direct access to the DOM, and a comprehensive set of commands for simulating user interactions.

### Encountered Challenges and Limitations

1. **CAPTCHA Challenge**:
   - The presence of a CAPTCHA system, designed to differentiate between humans and bots, significantly limited the extent of automation. Specifically, any interaction with the application through Cypress resulted in a redirect to a CAPTCHA verification page (`/verify.php`), thereby preventing further automated steps.

2. **Limitation in Flight Search Functionality**:
   - A critical issue was encountered in the Flight Search Functionality, where searches consistently yielded 'No results found' regardless of the input criteria. This persistent issue rendered the automation of subsequent test cases ('Flight Booking Process' and 'Payment and Reservation Confirmation') unfeasible, as they rely on successful flight search results. This issue will be detailed and reported in the Bug Reporting section of this document.

### Handling the Limitations

Given these challenges, the approach to automation had to be adapted:

- **Manual CAPTCHA Resolution**: For CAPTCHA-related interruptions, the script was designed to pause, allowing for manual resolution. This hybrid approach maintained the automation for other parts of the test while acknowledging the necessity of manual intervention for CAPTCHA.

- **Focus on Feasible Test Cases**: Due to the limitation in the flight search functionality, the automation focus was placed on the first section of test cases that could be executed without depending on search results. These included validating the search functionality with various inputs and error handling.

- **Ideal Testing Environment Consideration**: In an ideal testing scenario, without CAPTCHA or with a workaround for it (like bypass tokens), and with a fully functional flight search feature, the automation would have included the complete set of test cases across all sections.

### Example of Automation Script

In an environment without these challenges, the automation scripts for the feasible test cases would be as follows (example):

### Continuous Integration and Deployment:
- In an ideal setup, these automated scripts would be integrated into a CI/CD pipeline, running the tests against the application in various environments (development, staging, production) to ensure continuous quality assurance.

### Conclusion on Automation:
- The presence of elements like CAPTCHA in the application poses real challenges to test automation. However, with the right environment and tools, automated testing can significantly enhance the efficiency and coverage of quality assurance processes in software development.

## Bug Reporting

Manual testing was conducted to identify potential bugs. The following bugs were found: I'll report them using a Jira ticket approach.

### JIRA Ticket 1: No Results Found in Featured Flights

### Title
No Results Found When Clicking on Recommended Destinations in Featured Flights

### Issue Type
Bug

### Priority
High

### Environment
Production

### Description
Users are encountering an issue where no results are found when clicking on recommended destinations listed under the "Featured Flights" section. This significantly impacts the user experience and potential flight bookings.

#### Steps to Reproduce
1. Navigate to the homepage of the PHP Travels Flights application.
2. Scroll down to the "Featured Flights" section.
3. Select any of the displayed recommended destinations.
4. Review the results on the subsequent page.

#### Expected Result
Users should be presented with a list of available flights for the chosen destination upon selection.

#### Actual Result
The system fails to display any flight results, consistently showing "No results found" for every selected destination.

## JIRA Ticket 2: Issue with Flight Search Functionality

### Title
Flight Search Fails to Find Flights Regardless of Parameters Set

### Issue Type
Bug

### Priority
High

### Environment
Production

### Labels
Flight-Search, Backend, Critical

### Description
A critical issue has been identified in the Flight Search functionality of the PHP Travels Flights application. The system consistently fails to find any flights, regardless of the various search parameters entered by the user.

### Steps to Reproduce
1. Access the PHP Travels Flights application.
2. Navigate to the Flight Search section.
3. Enter various search parameters (e.g., different dates, destinations, and number of passengers).
4. Initiate the flight search.
5. Observe the results displayed.

### Expected Result
The flight search function should return a list of available flights based on the entered search parameters.

### Actual Result
No flights are found in response to any search parameters, with the system consistently displaying a "No results found" message.

## JIRA Ticket 3: Incorrect LinkedIn Icon Redirection

### Title
LinkedIn Social Media Icon Redirects to Twitter

### Issue Type
Bug

### Priority
Medium

### Environment
Production

### Labels
UI, Social-Media, Link-Redirection

### Description

### Summary
On the PHP Travels Flights application, there is an issue with the social media icons located at the bottom right of the website. The icon intended for LinkedIn is mistakenly redirecting users to Twitter.

### Steps to Reproduce
1. Visit the homepage of the PHP Travels Flights application.
2. Scroll down to the bottom of the page to locate the social media icons.
3. Click on the icon that represents LinkedIn.
4. Observe the redirection behavior.

### Expected Result
Clicking on the LinkedIn icon should redirect the user to the LinkedIn page of PHP Travels Flights.

### Actual Result
The LinkedIn icon redirects the user to the Twitter page instead of LinkedIn.


## Conclusion

This document provides a comprehensive overview of the testing strategy employed for the PHP Travels Flights application. While the presence of CAPTCHA limited the extent of automation that could be achieved, the outlined test cases and manual testing efforts offer thorough coverage of the application's critical functionalities.

# Back-End Testing Challenge for OpenWeatherMap API

## Overview

This document outlines the approach taken for back-end testing of the OpenWeatherMap API (onecall-3). The testing focuses on evaluating various API functionalities, including current and forecast weather data, weather data for specific timestamps, and daily aggregation. Additionally, the methodology to reproduce specific error scenarios is discussed.

## Testing Approach

The testing was conducted using Cypress. The objective was to cover critical functionalities of the API and identify any potential edge cases.

### Test Scenarios

#### 1. Current and Forecasts Weather Data
- **Objective**: To verify the accuracy and consistency of current and forecasted weather data provided by the API.
- **Test Cases**:
  - Request current weather data for a known location and validate the response against expected weather conditions.
  - Retrieve weather forecast data for different time intervals (e.g., 3-hourly, daily) and assess the accuracy of the forecasts.

#### 2. Weather Data for Timestamp
- **Objective**: To test the API's ability to return accurate weather data for a specific timestamp.
- **Test Cases**:
  - Request weather data for a past timestamp and compare it with historical weather data.
  - Query weather data for a future timestamp and validate the response structure.

#### 3. Daily Aggregation
- **Objective**: To evaluate the daily aggregated weather data for accuracy and completeness.
- **Test Cases**:
  - Retrieve daily aggregated weather data for a specific location and verify key metrics (like temperature highs/lows, precipitation).

### Edge Case Scenarios
- Each test case also includes checks for edge cases, such as requests for dates far in the past or future, or for locations with typically unstable weather patterns.

## Error Reproduction

The following sections detail the approach to reproduce specific error responses from the OpenWeatherMap API.

### Error 500 - Justification for Non-Reproduction

In the scope of this testing challenge, the decision was made not to attempt the reproduction of Error 500 (Internal Server Error) for the OpenWeatherMap API. This decision is grounded in the following justifications:

1. **Nature of Error 500**: 
   - Error 500 is a server-side error, typically indicating unexpected conditions encountered by the server, which prevent it from fulfilling the request. This type of error is generally caused by issues within the server's internal architecture or by unforeseen server-side complications.

2. **Focus on Client-Side Testing**:
   - Our testing approach is primarily client-oriented, focusing on how the API responds to various client requests under normal and edge-case scenarios. Attempting to induce a server-side error falls outside the ethical boundaries and intended scope of our testing strategy.

4. **Avoiding Disruptive Practices**:
   - It's crucial to avoid any testing practices that could disrupt the service for other users. Inducing an Error 500 could potentially lead to broader service issues, impacting not only our testing but also other users' interactions with the API.

While not implemented in this test, a theoretical approach to test server-side error handling (like Error 500) involves the use of data mocking:

- **Mocking Data**: By creating mock data or scenarios that simulate server-side failures, one could theoretically test how the server handles such situations. This can be done by setting up a controlled environment where the server is fed with unexpected or erroneous data.
  
- **Simulating Server-Side Issues**: The mock data could include extreme cases or corrupted data inputs that the server might not handle correctly, potentially leading to an Error 500.

- **Observing Responses**: The key in this approach is to observe how the server responds to such mocked data, particularly whether it gracefully handles the error or crashes.

### Error 429 (Too Many Requests) - Reproduction with `siege`

For reproducing the Error 429 (Too Many Requests) from the OpenWeatherMap API, I utilized `siege`, a load testing and benchmarking utility. This error is typically triggered by exceeding the API's rate limit. Here's how the test was conducted:

#### Test Execution Using `siege`

1. **Test Setup**: 
   - The OpenWeatherMap API endpoint was selected for this test. Our aim was to send a large number of requests to this endpoint within a short time frame.
   - The API key for OpenWeatherMap was used in all requests to authenticate.

2. **Running the Test**: 
   - A `siege` command can be executed to simulate a high volume of traffic to the API endpoint as follows:

     ```bash
     siege -v -r 10 -c 50 'https://api.openweathermap.org/data/2.5/onecall?lat={LATITUDE}&lon={LONGITUDE}&appid={YOUR_API_KEY}'
     ```
     In this command:
     - `-v` enables verbose mode to provide detailed logs.
     - `-r 10` specifies the test to run 10 times.
     - `-c 50` sets 50 concurrent users to simulate heavy traffic.
     - The URL includes placeholders for `{LATITUDE}`, `{LONGITUDE}`, and `{YOUR_API_KEY}` which were replaced with actual values for the test.

## Conclusion

The back-end testing of the OpenWeatherMap API involved thorough examination of key functionalities and edge cases. The testing process highlighted the API's response accuracy and reliability in various scenarios, while also ensuring robust error handling capabilities.
