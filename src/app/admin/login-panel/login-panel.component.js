(function () {
    angular.module('login-panel')
        .component('loginPanel', {
          templateUrl: "app/admin/login-panel/login-panel.html",
          css: 'app/admin/login-panel/login-panel.css',
            controller: LoginPanel
        });

    LoginPanel.$inject = ['userAuthService', '$location', '$rootScope'];

    function LoginPanel(userAuthService, $location, $rootScope) {
        this.logOut = function () {
            userAuthService.signOut()
                .then(() => {
                    $rootScope.currentUser = null;
                    $location.path('/login');
                });
        }
    }
})();
