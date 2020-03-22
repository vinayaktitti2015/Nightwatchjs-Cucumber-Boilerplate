const { client } = require('nightwatch-api');
const env = require('dotenv').config({
    path: 'host.env'
})

const commands = {
    setFromOrigin: async function (args) {
        return await this.waitForElementPresent('@fromTextInput')
            .pause(2000)
            .useCss()
            .clearValue('@fromTextInput')
            .useCss()
            .setValue('@fromTextInput', args);
    },
    setFromOriginAutoSelect: async function (args, args2) {
        return await this.waitForElementPresent('@fromTextInput')
            .pause(2000)
            .useCss()
            .clearValue('@fromTextInput')
            .useCss()
            .setValue('@fromTextInput', args)
            .useXpath()
            .click("//*[contains(@data-test, 'suggested-station-name') and text()='" + args2 + "']");
    },
    setToDestinationAutoSelect: function (args, args2) {
        return this.waitForElementPresent('@toTextInput')
            .pause(2000)
            .useCss()
            .clearValue('@toTextInput')
            .useCss()
            .setValue('@toTextInput', args)
            .useXpath()
            .click("//*[contains(@data-test, 'suggested-station-name') and text()='" + args2 + "']");
    },
    setToDestination: function (args) {
        return this.waitForElementPresent('@toTextInput')
            .pause(2000)
            .useCss()
            .clearValue('@toTextInput')
            .useCss()
            .setValue('@toTextInput', args);
    },
    verifyInvalidFromStaionMessageExist: function (expectedResult) {
        return this.waitForElementPresent('@errorMessageFromStation')
            .pause(1000)
            .expect.element('@errorMessageFromStation').text.to.contain(expectedResult);
    },
    verifyInvalidToStaionMessageExist: function (expectedResult) {
        return this.waitForElementPresent('@errorMessageToStation')
            .pause(1000)
            .expect.element('@errorMessageToStation').text.to.contain(expectedResult);
    },
    clickDateWidget: function () {
        return this.waitForElementPresent("@dateWidget")
            .click("@dateWidget");
    },
    setDate: function (args) {
        const ele = 'tbody > tr > td[data-test="' + args + '"]';
        return this.useCss()
            .waitForElementPresent(ele)
            .useCss()
            .click(ele);
    },
    clickGetTickets: function () {
        return this.waitForElementPresent("@getTickets_Button")
            .click("@getTickets_Button", function (result) {
                this.assert.strictEqual(result.status, 0);
            }).pause(3000);
    },
    getYourSearchText: function (expectedResult) {
        return this.waitForElementPresent('@yourSearch_Label')
            .expect.element('@yourSearch_Label').text.to.contain(expectedResult);
    },
    getOutwardDate: function (expectedResult) {
        return this.waitForElementPresent('@outwardTravelDate')
            .pause(1000)
            .expect.element('@outwardTravelDate').text.to.contain(expectedResult);
    },
    verifyOutwardDepartureStation: async function (departureResult) {
        return await this.waitForElementPresent('@outwardDeparatureStation_Label')
            .pause(1000)
            .expect.element('@outwardDeparatureStation_Label').text.to.contain(departureResult);
    },
    verifyArrivalStation: async function (arrivalResult) {
        return await this.waitForElementPresent('@outwardArrivalStation_Label')
            .pause(1000)
            .expect.element('@outwardArrivalStation_Label').text.to.contain(arrivalResult);

    },
    verifyDateTimeTicketPricesExist: async function () {
        await client.elements('css selector', '[data-test="train-results-departure-time"]', function (result) {
            this.assert.equal(result.value.length, 4, 'train-results-departure-time row count assert');
        });
        await client.elements('css selector', '[data-test="train-results-arrival-time"]', function (result) {
            this.assert.equal(result.value.length, 4, 'train-results-arrival-time row count assert');
        });
        await this.getElementSize('@alternativePrice_Label', function (result) {
            this.assert.strictEqual(result.status, 0);
        });
        await this.getElementSize('@totalPrice', function (result) {
            this.assert.strictEqual(result.status, 0);
        });

        await this
            .perform(() => { this.expect.element('@resultsDepartureTime_Label').to.be.present; })
            .perform(() => { this.expect.element('@resultsArrivalTime_Label').to.be.present; })
            .perform(() => { this.expect.element('@alternativePrice_Label').to.be.present; })
            .perform(() => { this.expect.element('@totalPrice').to.be.present; });
    },
    clickContinueButton: function () {
        return this.waitForElementPresent("@continueButton")
            .click("@continueButton", function (result) {
                this.assert.strictEqual(result.status, 0);
            }).pause(3000);
    },
    clickBackButton: async function () {
        return await this.waitForElementPresent("@backButton")
            .click("@backButton", function (result) {
                this.assert.strictEqual(result.status, 0);
            }).pause(3000);
    },
    verifyTravelOptionsText: async function () {
        return await this.waitForElementPresent('@travelOptionsTitle_Label')
            .pause(1000)
            .expect.element('@travelOptionsTitle_Label').text.to.contain(departureResult);

    },
    verifyTextExist: async function (result) {
        return await this.useCss()
            .waitForElementPresent('body')
            .pause(1000)
            .expect.element('body').text.to.contain(result);

    },
};

module.exports = {
    url: process.env.baseURL,

    elements: {
        fromTextInput: {
            selector: "input[id='from.text']",
            locateStrategy: 'css selector'
        },
        toTextInput: {
            selector: "input[id='to.text']",
            locateStrategy: 'css selector'
        },
        errorMessageFromStation: {
            selector: "div > [for='from.text'] ~ [data-test='empty-from-station']",
            locateStrategy: 'css selector'
        },
        errorMessageToStation: {
            selector: "div > [for='to.text'] ~ [data-test='empty-to-station']",
            locateStrategy: 'css selector'
        },
        getTickets_Button: {
            selector: "[data-test='submit-journey-search-button']",
            locateStrategy: "css selector"
        },
        dateWidget: {
            selector: 'input[id="page.journeySearchForm.outbound.title"]',
            locateStrategy: "css selector"
        },


        // results page
        yourSearch_Label: {
            selector: '[data-test="change-journey-header"]',
            locateStrategy: "css selector"
        },
        outwardTravelDate: {
            selector: '[data-test="OUTWARD-travel-date"]',
            locateStrategy: "css selector"
        },
        outwardDeparatureStation_Label: {
            selector: 'span[data-test="direction-header-OUTWARD-departure-station"]',
            locateStrategy: "css selector"
        },
        outwardArrivalStation_Label: {
            selector: 'span[data-test="direction-header-OUTWARD-arrival-station"]',
            locateStrategy: "css selector"
        },
        cheapestPrice_Label: {
            selector: '[data-test="cheapest-price-label"]',
            locateStrategy: "css selector"
        },
        standardPrice_RadioButton: {
            selector: '[data-test="standard-class-price-radio-btn"]',
            locateStrategy: "css selector"
        },
        cjs_PriceLabel: {
            selector: '[data-test="cjs-price"]',
            locateStrategy: "css selector"
        },
        resultsDepartureTime_Label: {
            selector: '[data-test="train-results-departure-time"]',
        },
        resultsArrivalTime_Label: {
            selector: '[data-test="train-results-arrival-time"]',
            locateStrategy: "css selector"
        },
        alternativePrice_Label: {
            selector: 'div[data-test="alternative-price"]',
            locateStrategy: "css selector"
        },
        totalPrice: {
            selector: '[data-test="cjs-price"]',
            locateStrategy: "css selector"
        },
        continueButton: {
            selector: '[data-test="cjs-button-continue"]',
            locateStrategy: "css selector"
        },
        travelOptionsTitle_Label: {
            selector: '[data-test="travel-options-page-title"]',
            locateStrategy: "css selector"
        },
        backButton: {
            selector: '[data-test="backButton"]',
            locateStrategy: "css selector"
        },
    },

    commands: [commands]
};

