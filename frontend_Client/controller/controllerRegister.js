app.controller('controllerRegister', function ($scope) {
    $scope.login = function () {
        var data = {
            'name':$scope.name,
            'email': $scope.email,
            'password': $scope.password,
            'confirmPassword':$scope.confirmPassword
        }
    }
});