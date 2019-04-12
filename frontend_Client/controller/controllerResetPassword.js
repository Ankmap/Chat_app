app.controller('controlRestPassword', function ($scope, servicesResetPassword) {
    // console.log('army loveeeeeeeeeeeee');
    $scope.resetPassword = function () {
        var user = {
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword
        }
        // if ($scope.password != $scope.confirmPassword) {
        //     $scope.message = "Password and Confirmpassword not match ";
        //     alert('Password and Confirmpassword not match...!');
        // } else {
            servicesResetPassword.resetPassword(user, $scope);
        //}
    }
});
