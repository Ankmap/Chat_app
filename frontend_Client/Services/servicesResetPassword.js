/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - ServicesResetPassword.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
app.service('servicesResetPassword', function ($http, $location) {
    this.resetPassword = function (data, $scope,token) {
        $http({
            method: 'POST',
            url: `http://localhost:3000/resetPassword`,
            data: data,
            headers: {
                'token': token
              },
        }).then(
            function successCallback(response) {
                alert("Your password has been successful reset, you can now login with your new password.!");
                console.log(response);
                $location.path('login');
                $scope.message = "Your password has been successful reset, you can now login with your new password.!";
            },
            function errorCallback(response) {
                alert("reset password Unsuccessfully..! ");
                $scope.message =response.data.message;
            }
        );
    }
});