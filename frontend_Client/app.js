var app = angular.module('chatapp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'controlLogin'

    })

    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'controlForgotPassword'

    })

    $stateProvider.state('resetPassword', {
        url: '/resetPassword',
        templateUrl: 'templates/resetPassword.html',
        controller: 'controlRestPassword'

    })

    .state('registrationForm',{
        url: '/registrationForm',
        templateUrl: 'templates/registrationForm.html',
        controller: 'controlregistrationForm'
    })

     $urlRouterProvider.otherwise('login');

    
});
