/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - chatServices.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
app.service('chatServices', function ($http) {
    try {
        this.getAllUsers = function ($scope, usertoken) {
            console.log('Token------->', usertoken);
            $http({
                method: 'GET',
                url: 'http://localhost:3000/getAllUser',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log("successCallback========>", response)
                    $scope.allUser = response.data.result;
                    console.log("In successCallback------>", response.data.result);
                },
                function errorCallback(response) {
                    console.log("errorCallback========>", response)
                    console.log("Error: FrontEnd chatServiice getAllUser..");
                });
        }
    }
    catch (err) {
        console.log("ERROR: here in getting users")
    }
    try {
        this.getUserMsg = function ($scope) {
            var arr = [];
            var usertoken = localStorage.getItem('token');
            $http({
                method: 'GET',
                url: 'http://localhost:3000/getUserMsg',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log("successCallback======>", response.data.message);
                    for (let i = 0; i < (response.data.message); i++) {
                        a = response.data.message[i];
                        if (((localStorage.getItem('userid') == a.senderUserId) && (localStorage.getItem('ruserId') == a.receiverUserId)) || ((localStorage.getItem('userid') == a.receiverUserId && localStorage.getItem('ruserId') == a.senderUserId))) {
                            arr.push(a);
                        }
                    }
                    $scope.allUserArr = arr;
                    console.log(" Message send successfully....!", arr);
                },
                function errorCallback(response) {
                    console.log("errorCallback========>", response)
                    console.log("Error: FrontEnd chatServiice getUserMsg..");
                });
        }
    }
    catch (err) {
        console.log("ERROR:chatServiice getUserMsg..")
    }

})