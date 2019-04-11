//console.log('csk')
app.controller('controlForgotPassword', function ($scope, servicesForgotPassword) {
    //console.log('csk_love')
    $scope.forgotPassword = function () {
        //console.log('bridgelabz');
        var data = {
            'email': $scope.email
        }
        servicesForgotPassword.forgotPassword(data, $scope);
    }
});