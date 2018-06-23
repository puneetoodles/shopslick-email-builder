angular.module('email').controller('rootCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.$on('$viewContentLoaded', function (event) {
        $scope.isMenuActive = function (page) {
            var current = $location.path().substring(1);
            return page === current ? "active" : "";
        };

    });
}]);