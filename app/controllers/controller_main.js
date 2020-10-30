/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Main controller module.
 */

const controller_main = {
    /**
     * @method controller_main#homePage - GET HOME PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    homePage(_, response) {
        response.render('index');
    },

    /**
     * @method controller_main#getMentions - GET LEGAL MENTIONS PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getMentions(_, response) {
        const mentions_data = require('../data/mentions_legals.json')
        response.locals.mentions = mentions_data;
        response.render('mentions');
    },

    /**
     * @method controller_main#getCookiesConsent - GET COOKIES CONSENT PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getCookiesConsent(_, response) {
        response.render('cookies_consent');
    },

    
};

module.exports = controller_main;