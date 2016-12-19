angular.module('userApp', ['appRoutes', 'userControllers', 'mainControllers', 'userServices', 'authServices','ngAnimate'])

// angular.module('userApp', ['appRoutes', 'userControllers', 'userServices','ngAnimate']);

//this intercepts all http requests and assigns the Interceptor factory to add the token to the headers.
.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptors');
});
