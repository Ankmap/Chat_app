app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    // console.log($scope.currUserName);
    $scope.currUser = localStorage.getItem('userid');
    var token = localStorage.getItem("token");
    //console.log(token);
    /**
     * @Purpose : If token is null it goes to login
     **/ 
    if (token === null) {
        $state.go('login');
    }
    try {
        SocketService.on('newMessageSingle', (message) => {
            console.log("sendmessage function is working now....!");
            if (localStorage.getItem('userid') == message.senderUserId) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;
                } else {
                    $scope.allUserArr.push(message);
                    console.log('2222222222222======>',message);     
                }
            }
        });
    }
    catch (err) {
        console.log("error in finding message",err)
    }

    /**
     * @Purpose : Get all users
     **/
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope, token);
    }
    $scope.getAllUsers();
    $scope.person = function (userData) {
        $scope.allUserArr = '';
        localStorage.setItem('name', userData.name);
        localStorage.setItem('userId', userData._id);
        $scope.getUserMsg();
    }
    /**
     * @Purpose : get all message
     **/
    $scope.getUserMsg = function () {
        chatServices.getUserMsg($scope);
    }
    $scope.getUserMsg();

    /**
     * @Purpose: Send message function
     **/
    try {
        $scope.sendmessage = function () {
            console.log("sendmessage function is working now....!");
            var msg = {
                'senderUserId': localStorage.getItem('userid'),
                'senderName': localStorage.getItem('name'),
                'message': $scope.message,
                'date': $scope.date
            };
            /**
             * @Purpose : Emittin the message to the browser
             **/
            $scope.message = '';
            SocketService.emit('createMessage', msg);
        }
    }
    catch (err) {
        console.log("error in sending message to the reciever",err)
    }

    /**
     * @Purpose : Return back to login page
     **/
    try {
        $scope.logout = function () {
            localStorage.clear();
            $state.go('login')
        }
    }
    catch (err) {
        console.log("error in logout",err)
    }
});