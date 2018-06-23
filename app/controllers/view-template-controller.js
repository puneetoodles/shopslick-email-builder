angular.module('email').controller('viewTemplatesCtrl', ['$scope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location',
        function ($scope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location) {
           

                $scope.emailTemplates = JSON.parse(localStorage.getItem('Email'));
                console.log("view semailData", $scope.emailTemplates )

                $scope.remove = function(item) { 
                        var index = $scope.emailTemplates.indexOf(item);
                        $scope.emailTemplates.splice(index, 1);  
                        console.log("$scope.emailTemplates",$scope.emailTemplates)
                        localStorage.setItem('Email', JSON.stringify($scope.emailTemplates));
                      }
        
        }]);