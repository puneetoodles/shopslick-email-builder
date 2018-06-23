angular.module('email').controller('viewCampaignCtrl', ['$scope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location',
        function ($scope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location) {
            
            $scope.emailTemplates = JSON.parse(localStorage.getItem('Email')); 

        
        
        }
    ]);