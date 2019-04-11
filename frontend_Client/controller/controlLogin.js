//console.log("hiiii")
app.controller('controlLogin', function ($scope,servicesLogin) {
    //console.log("bappa")
    // $scope.myname="Ankita";
    $scope.login = function () {
        var data = {
            'email': $scope.email,
            'password': $scope.password
        }
        servicesLogin.login(data, $scope);
    }
});