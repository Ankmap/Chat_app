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
                $scope.message = "register successfully"
                $location.path('/login');
            },
            function errorCallback(response) {
                alert("Email id already exit or incorrect format...!");
                $scope.message = response.data.message.message;
                console.log(response);
            }
        );
    }
});