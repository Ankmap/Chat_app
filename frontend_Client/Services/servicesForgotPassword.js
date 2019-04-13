//console.log('army_love')
app.service('servicesForgotPassword', function ($http, $location) {
    //console.log('armylo00ve')
    this.forgotPassword = function (data, $scope) {
        //console.log('capgemini');
        $http({
            method: 'POST',
            url: 'http://localhost:3000/forgotPassword',
            data: data,
        }).then(
            function successCallback(response,token) {
                alert("Password sent to your register email successfully....!");
                //console.log('army_love');
                localStorage.setItem("token",token);
            },
            function errorCallback(response) {
                console.log("Password sent to your register email Unsuccessfully....!");
                alert("EmailId Incorrect...!");
                console.log(response);
                $scope.loginMessage = 'EmailId Incorrect ';
            }
        );
    }
});