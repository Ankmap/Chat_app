app.service('servicesLogin', function ($http, $location) {
    // console.log('army_love')
    this.login = function (data, $scope) {
        // Simple POST request example:
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data,
        }).then(
            // this function will be called when the request is success
            function successCallback(response) {
                console.log("Login successfully......!");
                alert("Login successfully......!");
                console.log(response);
                $location.path('dashboard');
                $scope.loginMessage = "Login successfully......";
            },
            // this function will be called when the request returned error status
            function errorCallback(response) {
                console.log('EmailId or Password Incorrect....! ')
                alert("EmailId or Password Incorrect");
                console.log(response);
                $scope.loginMessage = 'EmailId or Password Incorrect....';
            }
        );
    }
});  