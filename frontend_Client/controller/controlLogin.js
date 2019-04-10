app.controller('controlLogin', function ($scope,servicesLogin) {
    // console.log("hiiii")
    // $scope.myname="Ankita";
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        servicesLogin.login(data, $scope);
    }
});