/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - ServicesRegistartion.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
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
                console.log($scope.message);
                $location.path('/login');
            },
            function errorCallback(response) {
                alert("Email id already exit...!");
                $scope.message = response.data.message.message;
                console.log($scope.message);
                console.log(response);
            }
        );
    }
});