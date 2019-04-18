app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currentUserName = localStorage.getItem('name');
    console.log("$scope.currentUserName---->",$scope.currentUserName);
    $scope.currentUser = localStorage.getItem('userid');
    $scope.receiverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log(token);
    /**
     * @Purpose : if the token is null then redirects to login page
     **/
    if (token === null) {
        $state.go('login');
    }

    try {
        SocketService.on('newMessageSingle', (message) => {
            if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.receiverUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;
                } else {
                    console.log("Message is Here:-->",message)
                    $scope.allUserArr.push(message);
                }
            }
        });
    }
    catch (err) {
        console.log("Err: In newMessageSingle")
    }
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope, token);
    }
    $scope.getAllUsers();
    /**
     * @Purpose : Select a person from list
     **/
    $scope.person = function (userData) {
        $scope.allUserArr = '';
        localStorage.setItem('rusername', userData.name);
        localStorage.setItem('ruserId', userData._id);
        $scope.receiverUserName = localStorage.getItem('rusername');
        $scope.getUserMsg();
    }
    /**
     * @Purpose : get all message
     **/
    $scope.getUserMsg = function () {
        chatServices.getUserMsg($scope);
    }
    $scope.getUserMsg();

    try {
        console.log("sendmessage")
        $scope.sendmessage = function () {
            var msg = {
                'senderUserId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'receiverUserId': localStorage.getItem('ruserId'),
                'receiverName': localStorage.getItem('rusername'),
                'message': $scope.message
            };
            $scope.message = '';
            /**
             * @Purpose : To emit the message to the browser
             **/
            SocketService.emit('createMessage', msg);
        }
    }
    catch (err) {
        console.log("Err: Sending message to the receiver")
    }

    /**
     * @Purpose : Back to the login page
     **/ 
    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')
        }
    }
    catch (err) {
        console.log("Err:logout")
    }
});