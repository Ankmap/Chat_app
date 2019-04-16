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
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@===>',response)
                    $scope.allUser = response.data.result;
                    console.log(response.data.result);
                },
                function errorCallback(response) {
                    console.log("register Unsuccessfull ");
                    console.log(response);
                }
            );
        }
    }
    catch (err) {
        console.log("error found here in getting users")
    }
});