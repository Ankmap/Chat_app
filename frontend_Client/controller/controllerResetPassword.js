app.controller('controlRestPassword', function ($scope, servicesResetPassword) {
    // console.log('army ');
    $scope.resetPassword = function () {
        var user = {
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword
        }
        /**
         * @Purpose : validation for password and confirmpassword
         **/
        if($scope.password.length < 6){
            alert("Error: Password must contain at least six characters!");
            $scope.password.focus();
            return false;
        }
        re = /[0-9]/;
        if(!re.test($scope.password)){
            alert("Error: password must contain at least one number (0-9)!");
            $scope.password.focus();
            return false;
        }
        re = /[a-z]/;
        if(!re.test($scope.password)){
            alert("Error: password must contain at least one lowercase letter (a-z)!");
            $scope.password.focus();
            return false;
        }
        re = /[A-Z]/;
        if(!re.test($scope.password)){
            alert("Error: password must contain at least one uppercase letter (A-Z)!");
            $scope.password.focus();
            return false;
        }
        else if ($scope.password != $scope.confirmPassword) {
            $scope.message = "password and confirm password not match ";
            alert('password and confirm password not match ');
        } else {
            servicesResetPassword.resetPassword(user, $scope);
        }
    }
});
