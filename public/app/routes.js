var app = angular.module('appRoutes', ['ngRoute'])
//$routeProvider creates routes
.config(function($routeProvider, $locationProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'app/views/pages/home.html'
  })

  .when('/about', {
    templateUrl: 'app/views/pages/about.html'
  })

  .when('/login', {
    templateUrl: 'app/views/pages/users/login.html',
    authenticated: false
  })

  .when('/logout', {
    templateUrl: 'app/views/pages/users/logout.html',
    authenticated: true
  })

  .when('/profile', {
    templateUrl: 'app/views/pages/users/profile.html',
    authenticated: true
  })

  .when('/facebook/:token', {
    templateUrl: 'app/views/pages/users/social/social.html',
    controller: 'facebookCtrl',
    authenticated: false
  })

  .when('/facebookerror', {
    templateUrl: 'app/views/pages/users/login.html',
    controller: 'facebookCtrl',
    controllerAs: 'facebook',
    authenticated: false
  })

  .when('/twitter/:token', {
    templateUrl: 'app/views/pages/users/social/social.html',
    controller: 'twitterCtrl',
    controllerAs: 'twitter',
    authenticated: false
  })

  .when('/twittererror', {
    templateUrl: 'app/views/pages/users/login.html',
    controller: 'twitterCtrl',
    controllerAs: 'twitter',
    authenticated: false
  })

  .when('/google/:token', {
    templateUrl: 'app/views/pages/users/social/social.html',
    controller: 'googleCtrl',
    controllerAs: 'google',
    authenticated: false
  })

  .when('/googleerror', {
    templateUrl: 'app/views/pages/users/login.html',
    controller: 'googleCtrl',
    controllerAs: 'google',
    authenticated: false
  })


  .when('/register', {
    templateUrl: 'app/views/pages/users/register.html',
    controller: 'regCtrl',
    controllerAs: 'register',
    authenticated: false
  })

  .otherwise( { redirectTo: '/'} );

//gets rid of '#' in url  <base href='/'>
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {

    if(next.$$route.authenticated === true) {
      // console.log('Needs to be authenticated');
      if (!Auth.isLoggedIn()) {
        event.preventDefault();
        $location.path('/');
      }
    } else if (next.$$route.authenticated === false) {
      // console.log('Does not need to be authenticated');
      if(Auth.isLoggedIn()) {
        event.preventDefault();
        $location.path('/profile');
      }
    } else {
      console.log('Authentication does not matter');
    }
    // console.log(next.$$route.authenticated);
    // console.log(Auth.isLoggedIn());

  });
}]);
