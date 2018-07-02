angular.module('email').controller('viewEmailCtrl', ['$scope', 'utils', 'storage', 'dragulaService', '$interpolate', '$translate', '$templateCache', 'variables', '$location', '$routeParams', '$rootScope',
        function ($scope, utils, storage, dragulaService, $interpolate, $translate, $templateCache, variables, $location, $routeParams, $rootScope) {


                $scope.checkedArray = [];
                $scope.showAction = false;

                $scope.emails = JSON.parse(localStorage.getItem('cEmail'));


                $scope.checkReadEmail = function (item, index) {
                        var index = $scope.emails.indexOf(item);
                        item.selected = false;
                        item.read = true;
                        $scope.emails.splice(index, 1, item);
                        localStorage.setItem('cEmail', JSON.stringify($scope.emails));
                        $location.path("createEmail/email/" + item.id);
                        $rootScope.isMenuActive('email')
                }

                $scope.removeItem = function () {
                        angular.forEach($scope.checkedArray, function (id) {
                                angular.forEach($scope.emails, function (item) {
                                        if (id == item.id) {

                                                var index = $scope.emails.indexOf(item);
                                                $scope.emails.splice(index, 1);

                                        }
                                });
                        });


                        localStorage.setItem('cEmail', JSON.stringify($scope.emails));
                }




                $scope.toggleCheckboxAll = function () {
                        $scope.checkedArray = [];
                        var toggleStatus = $scope.isAllSelected;
                        angular.forEach($scope.emails, function (itm) {
                                itm.selected = toggleStatus;
                        });
                        if ($scope.isAllSelected == true) {
                                $scope.showAction = true;
                                angular.forEach($scope.emails, function (itm) {
                                        $scope.checkedArray.push(itm.id)
                                });
                        } else {
                                $scope.showAction = false;
                        }

                }


                $scope.checkBoxToggled = function (item) {

                        if (item.selected == true) {
                                $scope.checkedArray.push(item.id);
                                $scope.showAction = true;
                        } else {
                                var index = $scope.checkedArray.indexOf(item);
                                $scope.checkedArray.splice(index, 1);
                                $scope.showAction = false;

                        }
                        $scope.isAllSelected = $scope.emails.every(function (itm) {
                                return itm.selected;
                        });
                }



        }
]);