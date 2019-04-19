//console.log('csk')
app.controller('controlForgotPassword', function ($scope, servicesForgotPassword) {
    //console.log('csk_love')
    $scope.forgotPassword = function () {
        //console.log('bridgelabz');
        var data = {
            'email': $scope.email
        }
        /**
         * @Purpose : validation for email
         **/
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test($scope.email) == false) {
            alert('Please enter register email id only');
            return (false);
        }
        servicesForgotPassword.forgotPassword(data, $scope);
    }
});