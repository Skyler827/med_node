var app = angular.module('med_node_app', []);

app.controller("med_node_ctl", ['$http', '$scope', function($http, $scope) {
    $scope.thing = "thing";
    console.log("thing");
    $scope.loggedin = false;
    $scope.loginFormUserName = "";
    $scope.loginFormPassword = "";

    $scope.login = function() {
        console.log("login?");
        $http.put("/login", {}).then(function(response) {
            console.log(response);
        });
    };
    $scope.logout = function() {
        $http.put("/logout").then(function(response) {
            console.log(response);
        });
    }
}]);
