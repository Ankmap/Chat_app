/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - ServicesLogin.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
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
                //console.log('response===>',response);
                console.log("Login successfully......!");
                alert("Login successfully......!");
                console.log(response);
                var userid = response.data.message[0]._id;
                var name = response.data.message[0].name;
                // console.log("name is here==================>"); 
                // console.log(name);
                var token = response.data.token;
                // console.log("token is here===============>"); 
                // console.log(token);
                localStorage.setItem("userid", userid);
                localStorage.setItem("name", name);      
                localStorage.setItem("token",token);
                $location.path('dashboard');
                $scope.loginMessage = "Login successfully......";
            },
            /**
             * @Purpose : This function will be called when the request returned error status
             **/
            function errorCallback(response) {
                console.log('EmailId or Password Incorrect....! ')
                alert("EmailId or Password Incorrect");
                console.log(response);
                $scope.loginMessage = 'EmailId or Password Incorrect....';
            }
        );
    }
});  