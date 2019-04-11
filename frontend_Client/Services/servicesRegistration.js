console.log('check service  Reg1');
app.service('servicesRegistration', function ($http, $location) {
    console.log('check service  Reg1');
    this.registrationForm = function (data, $scope) {
        console.log('check service  Reg3');
        $http({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: data
        }).then(
            function successCallback(response) {
                alert("Register successfully...!");
                console.log(response);
                $scope.message = "Register successfully...!";
                $location.path('/login');
            },
            function errorCallback(response) {
                alert("Register Unsuccessfully...!");
                $scope.message =response.data.message.message;
            }
        );
    }
});