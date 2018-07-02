'use strict';

// Declare app level module which depends on views, and components
angular.module('email', ['ngRoute', 'email.builder', 
'mgo-angular-wizard', 'ngTagsInput']).config([
    '$locationProvider',
    '$routeProvider',

    function ($locationProvider, $routeProvider) {
        
        $locationProvider.hashPrefix('');
        $routeProvider.otherwise({
            redirectTo: '/'
        });


    },
])

/**
 * Email builder module
 * Include this module in your project like another Angular module ['email.builder'] or you can rename it.
 */
angular.module('email.builder', [
    'ngRoute',
    angularDragula(angular),
    'pascalprecht.translate',
    'ui.tinymce',
    'ngSanitize',
    'ngAlertify',
    'colorpicker.module',
    'mgo-angular-wizard',
    'ngTagsInput'
])
    /**
     * You can upload custom images
     * This is a demo url, you can change with your own
     * At this url, will be send a POST request with 'upload' param, whem 'upload' is what you need to upload
     * You must return a status_code = 200 and put all information in 'data' like 'data.img_url', otherwise return status_txt with your error
     */
    .constant('variables', emailBuilderConfigurations)

    /**
     * Basic TinyMCE configs
     * Change this if you really know what you do
     */
    .value('uiTinymceConfig', {
        baseUrl: emailBuilderConfigurations.tinymceBaseUrl,
        format: 'raw',
    })

   

    /**
     * Module configurations
     */
    .config(['$routeProvider', '$translateProvider', '$translatePartialLoaderProvider', '$sceDelegateProvider','$compileProvider', 'variables',
        function ($routeProvider, $translateProvider, $translatePartialLoaderProvider, $sceDelegateProvider, $compileProvider, variables) {
            $sceDelegateProvider.resourceUrlWhitelist(['self']);
            $compileProvider.debugInfoEnabled(false);


            

            /**
             * Change '/' with your email builder route
             */
            $routeProvider.when('/', {
                templateUrl: variables.layoutsPath + '/view-create-email.html',
                controller: 'viewEmailCtrl'
            }).when('/emailBuilder/templates', {
                templateUrl: variables.layoutsPath + '/email-view.html'
            }).when('/viewTemplates/templates', {
                templateUrl: variables.layoutsPath + '/view-templates.html',
                controller: 'viewTemplatesCtrl'
            }).when('/email/:emailID', {
                templateUrl: variables.layoutsPath + '/email-view.html'
            }).when('/create/Campaign', {
                templateUrl: variables.layoutsPath + '/create-campaign.html',
                controller: 'createCampaignCtrl'
            }).when('/view/Campaign', {
                templateUrl: variables.layoutsPath + '/view-campaign.html',
                controller: 'viewCampaignCtrl'
            }).when('/createEmail/email', {
                templateUrl: variables.layoutsPath + '/create-email.html',
                controller: 'createEmailCtrl'
            }).when('/viewCreateEmail/email', {
                templateUrl: variables.layoutsPath + '/view-create-email.html',
                controller: 'viewEmailCtrl'
            }).when('/sentEmail/email', {
                templateUrl: variables.layoutsPath + '/sent-create-email.html',
                controller: 'viewEmailCtrl'
            }).when('/createEmail/email/:emailID', {
                templateUrl: variables.layoutsPath + '/create-email.html',
                controller: 'createEmailCtrl'
            });
            

            /**
             * Tanslate configurations
             * Change 'urlTemplate' if you have another location for translations
             */
            $translatePartialLoaderProvider.addPart('builder');
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: variables.translateTemplateUrl
            });
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('sanitize');
            $translateProvider.fallbackLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escape');
        }])

    /**
     * Cache all email blocks template, to load very fast
     * Be very careful if you want to change them
     */
    .run(['$templateCache', 'variables', function ($templateCache, variables) {
        Object.keys(variables.blocks).forEach(function (key) {
            return variables.disableBlocks.indexOf(key) === -1 && $templateCache.put(variables.blocks[key].type + "Template", variables.blocks[key].template);
        });
    }])

    
