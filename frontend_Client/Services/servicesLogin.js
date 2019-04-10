app.service('servicesLogin', function ($http, $location) {
    console.log('army')
    this.login = function (data, $scope) {
        // Simple POST request example:
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: data,
        }).then(
            // this function will be called when the request is success
            function successCallback(response) {
                console.log('554545454545')
                console.log("Login successfully ");
                // var user_id = response.data.message[0]._id;
                // var name = response.data.message[0].name;

                // localStorage.setItem("userid", user_id);
                // localStorage.setItem("name", name);
                
                $location.path('dashboard');
                $scope.loginMessage = "login successfully";
            },
            // this function will be called when the request returned error status
            function errorCallback(response) {
                console.log('EmailId or Password Incorrect....! ')
                alert("EmailId or Password Incorrect");
                console.log(response);
                $scope.loginMessage = 'EmailId or Password Incorrect....! ';
            }
        );
    }
});