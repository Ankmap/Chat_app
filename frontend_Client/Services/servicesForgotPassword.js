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
                console.log(response);
                alert("Password sent to your register email successfully....!");
                //console.log('army_love');
                var userid = response.data.message[0]._id;
                var name = response.data.message[0].name;
                var token = response.data.token;
                localStorage.setItem("userid", userid);
                localStorage.setItem("name1", name);
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