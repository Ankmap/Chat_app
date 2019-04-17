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
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!reg.test($scope.email)){
            alert("Please Enter valid email format");
            $scope.password.focus();
            return false;
        }
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
        } 
        else {
            servicesRegistration.registrationForm(user, $scope);
        }
    }
});