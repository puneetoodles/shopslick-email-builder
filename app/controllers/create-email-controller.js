angular.module('email').controller('createEmailCtrl', ['$scope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location',
        function ($scope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location) {


                $scope.emailTemplates = JSON.parse(localStorage.getItem('Email'));


                $scope.chooseEmail = function (currentTemplate) {

                        var ciResponseText = document.getElementById('ciResponseText');
                        ciResponseText.innerHTML = '';
                        angular.forEach($scope.emailTemplates, function (email) {
                                if (currentTemplate == email.id) {
                                        var templateData = JSON.stringify(email.html);
                                        var template = templateData.replace(/\\n/g, '').replace(/\\"/g, '').replace(" ", "");
                                        ciResponseText.innerHTML = template;

                                }

                        });

                }




        }
]);