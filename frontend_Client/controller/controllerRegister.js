// console.log('check control Reg1');
app.controller('controlregistrationForm', function ($scope, servicesRegistration ) {
//    console.log('check control Reg2');
    $scope.registrationForm = function () {
        var user = {
            'name': $scope.name,
            'email': $scope.email,
            'password': $scope.password,
            'confirmPassword': $scope.confirmPassword
        }
        if ($scope.password != $scope.confirmPassword) {
            $scope.message = "password and confirm password not match ";
            alert('password and confirm password not match ');
        } else {
            servicesRegistration.registrationForm(user, $scope);
        }
    }
});