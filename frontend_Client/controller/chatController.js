app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    // console.log($scope.currUserName);
    $scope.currUser = localStorage.getItem('userid');
    $scope.recieverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    //console.log(token);
    /**
     * @Purpose : If token is null it goes to login
     **/ 
    if (token === null) {
        $state.go('login');
    }
    try {
        SocketService.on('newMessageSingle', (message) => {//listening to the evnts
            if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.recieverUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
                if ($scope.allUserArr === undefined) {
                    $scope.allUserArr = message;//assighning message to variable
                } else {
                    $scope.allUserArr.push(message);
                }
            }
        })
    }
    catch (err) {
        console.log("error in finding message")
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
        localStorage.setItem('rusername', userData.name);//getting data from localstorage
        localStorage.setItem('ruserId', userData._id);
        $scope.recieverUserName = localStorage.getItem('rusername');
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
                'recieverUserId': localStorage.getItem('ruserId'),
                'recieverName': localStorage.getItem('rusername'),
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