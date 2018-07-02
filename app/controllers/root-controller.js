angular.module('email').controller('rootCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.$on('$viewContentLoaded', function (event) {
        $scope.isMenuActive = function (currentParam) {
            var getParam = $location.path().substr($location.path().lastIndexOf('/') + 1);
            return currentParam === getParam ? "active" : "";
        };

    });
}]);