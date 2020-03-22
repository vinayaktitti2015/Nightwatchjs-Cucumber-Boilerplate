const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
var trainlinePage = client.page.trainlinePage_objects();

Given(/^I open Trainline search page$/, async () => {
    //return page.navigate();
    await trainlinePage.navigate()
        .pause(2000);
});
When(/^I open trainline website$/, async () => {
    return await trainlinePage.open();
});
When(/^I enter from origin "([^"]*)"$/, async (arg1) => {
    return await trainlinePage.setFromOrigin(arg1)
});
When(/^I enter to destination "([^"]*)"$/, async (arg1) => {
    await trainlinePage.setToDestination(arg1)
});
When(/^I enter from origin "([^"]*)" and autoselect "([^"]*)"$/, async (arg1, arg2) => {
    return await trainlinePage.setFromOriginAutoSelect(arg1, arg2)
});
When(/^I enter to destination "([^"]*)" and autoselect "([^"]*)"$/, async (arg1, arg2) => {
    await trainlinePage.setToDestinationAutoSelect(arg1, arg2)
});
Then(/^I should see From station errorMessage "([^"]*)"$/, async function (arg1) {
    await trainlinePage.verifyInvalidFromStaionMessageExist(arg1)
});
Then(/^I should see To station errorMessage "([^"]*)"$/, async function (arg1) {
    await trainlinePage.verifyInvalidToStaionMessageExist(arg1)
});
When(/^I click outbound datewidget$/, async () => {
    await trainlinePage.clickDateWidget()
});
When(/^I select date "([^"]*)"$/, async (arg1) => {
    await trainlinePage.setDate(arg1)
});
When(/^I click getTickets button$/, async () => {
    await trainlinePage.clickGetTickets()

});
Then(/^I should see page title "([^"]*)"$/, (arg1) => {
    return driver.getTitle().then(function (title) {
        expect(title).to.contain(arg1)
    });
});
Then(/^I should see partialLinkText "([^"]*)"$/, async (arg1) => {
    return driver.wait(until.elementsLocated(by.partialLinkText(arg1)), 10000);
});
Then(/^I should see Your Search header contains "([^"]*)"$/, async (arg1) => {
    await trainlinePage.getYourSearchText(arg1);
});
Then(/^I should see Outward Travel Date "([^"]*)"$/, async (arg1) => {
    await trainlinePage.getOutwardDate(arg1);
});
Then(/^I should see OutwardDepartureStation as "([^"]*)"$/, async function (arg1) {
    await trainlinePage.verifyOutwardDepartureStation(arg1);
});
Then(/^I should see OutwardArrivalStation as "([^"]*)"$/, async function (arg1) {
    await trainlinePage.verifyArrivalStation(arg1);
});
Then(/^The departure date time & ticket prices should exist$/, async function () {
    await trainlinePage.verifyDateTimeTicketPricesExist();
});
When(/^I click Continue button$/, async function () {
    await trainlinePage.clickContinueButton();
});
Then(/^I should see TravelOptions page$/, async function () {
    await trainlinePage.verifyTravelOptionsText();
});
When(/^I click Back button$/, async function () {
    await trainlinePage.clickBackButton();
});
Then(/^I should see text "([^"]*)" exist$/, async function (string) {
    await trainlinePage.verifyTextExist(string);
});