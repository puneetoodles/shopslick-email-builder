angular.module('email').factory('storage', ['utils', 'variables', function (utils, variables) {
    'use strict';
    console.log("in")
    var STORAGE_ID = 'Email',
        self = this;


    self.opts = {
        /**
         * Get Email from localStorage
         */
        get: function () {
            var emailTemplates = JSON.parse(localStorage.getItem(STORAGE_ID));
            return new Promise(function (resolve, reject) {
                try {
                    var emailData = {
                        name: variables.defaults[0].newEmailName,
                        elements: [],
                        html: '',
                        id: '',
                        dateCreated: '',
                        dateModified: '',
                        emailSettings: {
                            options: variables.defaults[0].emailOptions,
                            type: 'emailSettings'
                        }
                    };
                    resolve(emailData);
                } catch (e) {
                    utils.notify(e).error();
                    reject(e);
                }
            });
        },

        /**
         * Put changed data in Email
         * Emulate server storage with Promise
         * @param email
         * @returns {Promise}
         */
        put: function (email) {
            return new Promise(function (resolve, reject) {
                try {
                    // Remove multine breaks
                    //email.html = utils.removeLineBreaks(email.html);
                    // angular.forEach(email, function(email){
                    //     console.log("email.html",email.html)
                    //     email.html = utils.removeLineBreaks(email.html);
                    //     emailList.push(email);
                    // })
                    localStorage.setItem(STORAGE_ID, JSON.stringify(email));
                    resolve();
                } catch (e) {
                    utils.notify(e).error();
                    reject(e);
                }
            });
        },

        /**
         * Delete current email template
         * @returns {*}
         */
        delete: function () {
            return delete localStorage[STORAGE_ID] && self.opts.get();
        }
    };

    return self.opts;
}])