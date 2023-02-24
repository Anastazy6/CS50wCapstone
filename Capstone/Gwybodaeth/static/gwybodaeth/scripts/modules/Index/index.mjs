import { Util } from "../Utilities/util.mjs";

const indexApp = angular.module('index', []);

indexApp.config(($interpolateProvider) => {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol  ('}]}');
})


indexApp.controller('indexController', ($scope) => {
  $scope.test = "Index html"
})