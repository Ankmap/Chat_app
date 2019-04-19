/*****************************************************************************************************
 *@Purpose -Chatapp.
 *@file    - chatController.js
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 2/04/2019
 **************************************************************************************************/
app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currentUserName = localStorage.getItem('name');
    $scope.currentUser = localStorage.getItem('userid');
    $scope.receiverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log(token.exp);

    try {
        SocketService.on('newMessageSingle', (message) => {
            if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.receiverUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;
                } else {
                    console.log(message)
                    $scope.allUserArr.push(message);
                }
            }
        })
    }
    catch (err) {
        console.log("ERROR: newMessageSingle",err)
    }

    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope, token);
    }
    $scope.getAllUsers();
    $scope.person = function (userData) {
        $scope.allUserArr = '';

        localStorage.setItem('rusername', userData.name);
        localStorage.setItem('ruserId', userData._id);
        $scope.receiverUserName = localStorage.getItem('rusername');
        $scope.getUserMsg();
    }
    $scope.getUserMsg = function () {
        chatServices.getUserMsg($scope);
    }
    $scope.getUserMsg();

    try {
        $scope.sendmessage = function () {
            var msg = {
                'senderUserId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'receiverUserId': localStorage.getItem('ruserId'),
                'receiverName': localStorage.getItem('rusername'),
                'message': $scope.message
            };
            $scope.message = '';
            SocketService.emit('createMessage', msg);
        }
    }
    catch (err) {
        console.log("ERROR: while sending message to the receiver")
    }

    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')
        }
    }
    catch (err) {
        console.log("ERROR: while logging out")
    }
});