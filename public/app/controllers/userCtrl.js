angular
  .module('userControllers',['userServices'])
  .controller('regCtrl', function($http, $location, $timeout, User) {
    var app = this;
    this.regUser = function(regData) {
      app.loading = true;
      app.errorMsg = false;
      // console.log(this.regData);
      User.create(app.regData).then(function(data) {
        if (data.data.success) {
          //loading logo disappears after response.
          app.loading = false;
          //create success message
          app.successMsg = data.data.message + '...Redirecting';
          $timeout(function() {
            //redirect to home page
            $location.path('/');
          }, 2000);
        } else {
          //loading logo disappears after response.
          app.loading = false;
          //create error message
          app.errorMsg = data.data.message;
        }
      });
    };
  })

.controller('facebookCtrl', function($routeParams, Auth, $location, $window) {
  var app = this;
  if ($window.location.pathname === '/facebookerror') {
      app.errorMsg = 'Facebook email not found in database';
  } else {
    console.log($routeParams.token);
    Auth.facebook($routeParams.token);
    $location.path('/');
  }
})

.controller('twitterCtrl', function($routeParams, Auth, $location, $window) {
  var app = this;
  if ($window.location.pathname === '/twittererror') {
      app.errorMsg = 'Twitter email not found in database';
  } else {
    console.log($routeParams.token);
    Auth.facebook($routeParams.token);
    $location.path('/');
  }
})

.controller('googleCtrl', function($routeParams, Auth, $location, $window) {
  var app = this;
  if ($window.location.pathname === '/googleerror') {
      app.errorMsg = 'Google+ email not found in database';
  } else {
    console.log($routeParams.token);
    Auth.facebook($routeParams.token);
    $location.path('/');
  }
});


  // router.post('/users', function(req, res) {
