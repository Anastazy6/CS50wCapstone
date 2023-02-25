// import { Util } from "../Utilities/util.mjs";

const indexApp = angular.module('index', []);

indexApp.config(($interpolateProvider) => {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol  ('}]}');
})


indexApp.controller('indexController', ($scope, $http) => {
  $scope.test = "Index html"

  $scope.postNews = () => {
    $http({
      method: 'POST',
      url   : '/',

      headers: {
        "X-CSRFToken" : document.querySelector("[name=csrfmiddlewaretoken]").value,
        "Content-Type": "application/json"
      },

      data: {
        title: $scope.newsTitle,
        body : $scope.newsBody
      }
    })
    .then(response => {
      console.log(response);
    })
  }
})