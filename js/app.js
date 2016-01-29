/*
 * Marcdown - the online Markdown editor by Clyde D'Souza
 * app.js
 * Clyde D'Souza (http://goo.gl/8yXVaA)
 * Github @ClydeDz | Twitter @ClydeDz
 */

//
angular.module("marcdown", ['hc.marked', 'ngRoute', 'ngFileSaver']);

// Configuration for routing and switching between help and editor views
angular.module('marcdown')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when("/", { templateUrl: "/views/editor.html",  controller: "IndexController" })
        .when("/help", { templateUrl: "/views/help.html", controller: "HelpController" });
    }]);

// controller
angular.module("marcdown")
    .controller("IndexController", ['$scope', 'FileSaver', 'Blob', function IndexController($scope, FileSaver, Blob) {
        $scope.markdownContent = "## Type your **content** *here*";
        $scope.menuItem = 1;
        $scope.wordCount = ($scope.markdownContent).toString().length;

        $scope.downloadWord = function (x) {
            $scope.data = new Blob([$scope.markdownContent], { type: 'application/msword' });
            FileSaver.saveAs($scope.data, 'marcdown.doc');
        };
        $scope.downloadText = function (x) {
            $scope.data = new Blob([$scope.markdownContent], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs($scope.data, 'marcdown.txt');
        };
        $scope.downloadMarkdown = function (x) {
            $scope.datamd = new Blob([$scope.markdownContent], { type: 'text/markdown' });
            FileSaver.saveAs($scope.datamd, 'marcdown.md');
        };
        $scope.openPdf = function () {
            var dd = {
                content: $scope.markdownContent,
                footer: {
                    text: "Created using marcdown at http://marcdown.azurewebsites.net/",
                    margin:[40, 0, 0, 0]
                }
            };
            createPdf(dd).download('marcdown.pdf');
        };
    }]);

// Help page controller
angular.module('marcdown')
    .controller("HelpController", ['$scope', 'FileSaver', 'Blob', function IndexController($scope, FileSaver, Blob) {
    }]);

