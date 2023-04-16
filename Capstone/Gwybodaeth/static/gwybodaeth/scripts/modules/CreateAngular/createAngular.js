import { Util } from "../Utilities/util.js";
const createApp = angular.module('createApp', []);
createApp.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
createApp.controller("createCtrl", function ($scope) {
  console.log("Angular works correctly!");
});