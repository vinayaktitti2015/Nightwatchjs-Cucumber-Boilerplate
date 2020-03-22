module.exports = {
    verifyTextExist: async function (result) {
        return await this.useCss()
            .waitForElementPresent('body')
            .pause(1000)
            .expect.element('body').text.to.contain(result);

    }
}