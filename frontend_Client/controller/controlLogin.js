app.controller('controlLogin', function ($scope) {
    // console.log("hiiii")
    // $scope.myname="Ankita";
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
    }
});