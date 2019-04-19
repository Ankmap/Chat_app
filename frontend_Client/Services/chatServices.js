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
            $http({
                method: 'GET',
                url: 'http://localhost:3000/getAllUser',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log("successCallback in front end chat services=======>", response.data.result)
                    $scope.allUser = response.data.result;
                    console.log(response.data.result);
                },
                function errorCallback(response) {
                    console.log("registration Unsuccessful ");
                    console.log("errorCallback====>", response);
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
                method: 'GET',//assigning GET 
                url: 'http://localhost:3000/getUserMsg',
                headers: {
                    'token': usertoken,
                }
            }).then(
                function successCallback(response) {
                    console.log("successCallback getUserMsg front end chat service======>", response.data.result);
                    for (let i = 0; i < (response.data.result.length); i++) {
                        a = response.data.result[i];
                        if (((localStorage.getItem('userid') == a.senderUserId) && (localStorage.getItem('ruserId') == a.receiverUserId)) || ((localStorage.getItem('userid') == a.receiverUserId && localStorage.getItem('ruserId') == a.senderUserId))) {
                            arr.push(a);
                        }
                    }
                    $scope.allUserArr = arr;
                    console.log("User's message was sent successfully ", arr);
                },
                function errorCallback(response) {
                    console.log("Unsuccessful ");
                    console.log(response);
                });
        }
    }
    catch (err) {
        console.log("ERROR: in getting the message")
    }

});