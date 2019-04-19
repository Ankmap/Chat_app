/**
 * @Purpose : Created an instance of an Angular module.
 **/ 
var app = angular.module('chatapp',['ui.router','btford.socket-io']);

app.config(function($stateProvider, $urlRouterProvider){

    /**
     * @Purpose : For login.
     **/ 
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'controlLogin'
    })

    /**
     * @Purpose : For forgotPassword.
     **/
    $stateProvider.state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'controlForgotPassword'
    })

    /**
     * @Purpose : For resetPassword.
     **/
    $stateProvider.state('resetPassword', {
        url: '/resetPassword/:token',
        templateUrl: 'templates/resetPassword.html',
        controller: 'controlRestPassword'
    })

    /**
     * @Purpose : For registrationForm.
     **/
    .state('registrationForm',{
        url: '/registrationForm',
        templateUrl: 'templates/registrationForm.html',
        controller: 'controlregistrationForm'
    })

    /**
     * @Purpose : For dashboard.
     **/
    .state('dashboard',{
        url: '/dashboard',
        templateUrl: 'templates/dashboard.html',
        controller: 'chatController'
    })
    
     $urlRouterProvider.otherwise('login');
});
/**
* @Purpose : For Socket connection.
**/
app.service('SocketService', ['socketFactory', function SocketService(socketFactory){
    return socketFactory({
        /**
        * @Purpose : connecting socket io.
        **/
        ioSocket: io.connect('http://localhost:3000')  
    })
}])
