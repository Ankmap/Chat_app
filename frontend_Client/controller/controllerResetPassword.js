app.controller('controlRestPassword', function ($scope) {
    $scope.login = function () {
        var data = {
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword
        }
    }
});