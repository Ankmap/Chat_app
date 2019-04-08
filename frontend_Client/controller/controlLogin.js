app.controller('controlLogin', function ($scope) {
    console.log("hiiii")
    $scope.myname="snehal";
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
    }
});