angular.module('mainControllers', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope, $window) {
  var app = this;
//app.loadme will is used in index.html to prevent loading of angular html before data is received.
  app.loadme = false;
//this is where items in html are created.
  $rootScope.$on('$routeChangeStart', function() {
    if (Auth.isLoggedIn()) {
      //true whenever someone is logged in.
      app.isLoggedIn = true;
      // console.log('Success: User is logged in.');
      Auth.getUser().then(function(data) {
        // console.log(data.data.username);
        app.username = data.data.username;
        app.useremail = data.data.email;
        app.loadme = true;
      });
    } else {
      // console.log('Failure: User is NOT logged in');
      app.isLoggedIn = false;
      app.username = '';
      app.loadme = true;
    }
    //remove the '#_=_ that facebook adds in redirect'
    if ($location.hash() === '_=_' ) $location.hash(null);
  });

  this.facebook = function() {
    console.log($window.location.host);//localhost:8080
    console.log($window.location.protocol);//http:
    $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';
  };

  this.twitter= function() {
    console.log($window.location.host);//localhost:8080
    console.log($window.location.protocol);//http:
    $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/twitter';
  };

  this.google = function() {
    console.log($window.location.host);//localhost:8080
    console.log($window.location.protocol);//http:
    $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';
  };

    this.doLogin = function(loginData) {
      app.loading = true;
      app.errorMsg = false;
      // console.log(this.loginData);
      Auth.login(app.loginData).then(function(data) {
        if (data.data.success) {
          //loading logo disappears after response.
          app.loading = false;
          //create success message
          app.successMsg = data.data.message + '...Redirecting';
          $timeout(function() {
            //redirect to home page
            $location.path('/about');
            app.loginData = '';
            app.successMsg = false;
          }, 2000);
        } else {
          //loading logo disappears after response.
          app.loading = false;
          //create error message
          app.errorMsg = data.data.message;
        }
      });
    };

    this.logout = function() {
      Auth.logout();
      $location.path('/logout');
      $timeout(function() {
        $location.path('/');
      }, 2000);

    };
});
