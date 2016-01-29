// app.js
angular.module("marcdown", ['hc.marked', 'ngRoute', 'ngFileSaver']);

// Configuration for routing and switching between help and editor views
angular.module('marcdown')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/", { templateUrl: "/views/editor.html", controller: "IndexController" })
        .when("/help", { templateUrl: "/views/help.html", controller: "HelpController" });
    }]);

// controller
angular.module("marcdown")
    .controller("IndexController", ['$scope', 'FileSaver', 'Blob', function IndexController($scope, FileSaver, Blob) {
        $scope.markdownContent = "";
        $scope.menuItem = 1;
        $scope.wordCount = ($scope.markdownContent).toString().length;

        $scope.downloadText = function (x) {
            $scope.data = new Blob([$scope.markdownContent], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs($scope.data, 'text.txt');
        };
        $scope.downloadMarkdown = function (x) {
            $scope.datamd = new Blob([$scope.markdownContent], { type: 'text/markdown' });
            FileSaver.saveAs($scope.datamd, 'text.md');
        };
        $scope.openPdf = function () {
            var dd = {
                content: $scope.markdownContent,
                footer: {
                    text: "Created using marcdown at http://marcdown.azurewebsites.net/",
                    margin:[40, 0, 0, 0]
                }
            };
            createPdf(dd).download();
        };
    }]);

// Help page controller
angular.module('marcdown')
    .controller("HelpController", ['$scope', 'FileSaver', 'Blob', function IndexController($scope, FileSaver, Blob) {
    }]);

