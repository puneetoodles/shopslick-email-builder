angular.module('email').controller('createCampaignCtrl', ['$scope', '$rootScope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location',
        function ($scope, $rootScope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location) {
            
            $scope.emailTemplates = JSON.parse(localStorage.getItem('Email')); 
           

              $scope.chooseEmail = function (currentTemplate) {
                 

                angular.forEach($scope.emailTemplates, function (email) {
                    if(currentTemplate == email.id){
                        
                    }
                });

              }

        
        }
    ]);