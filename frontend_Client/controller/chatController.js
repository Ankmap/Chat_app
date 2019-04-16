app.controller('chatController', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    console.log('=================>name');
    console.log($scope.currUserName);
    $scope.currUser = localStorage.getItem('userid');
    var token = localStorage.getItem("token");
    //console.log('@@@@@@@@@@@@@>token');
    //console.log(token);
    if (token === null) {
        $state.go('login');
    }
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope);
    }
    $scope.getAllUsers();
    $scope.person = function (userData) {
        $scope.allUserArr = '';
        localStorage.setItem('name', userData.name);
        localStorage.setItem('userId', userData._id);
    }
});