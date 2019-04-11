app.service('servicesResetPassword', function ($http, $location) {
    this.resetPassword = function (data, $scope) {
        $http({
            method: 'POST',
            url: `http://localhost:3000/resetPassword/${token.token}`,
            data: data
        }).then(
            function successCallback(response) {
                alert("Your password has been successful reset, you can now login with your new password.!");
                console.log(response);
                $scope.message = "Your password has been successful reset, you can now login with your new password.!";
                $location.path('/login');
            },
            function errorCallback(response) {
                alert("reset password Unsuccessfully..! ");
                $scope.message =response.data.message.message;
            }
        );
    }
});