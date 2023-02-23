// Experimental
import { Util } from "../Utilities/util.mjs";


const app = angular.module('studySet', []);

app.controller('studySetController', function($scope, $http) {
  $http.get(`/load/${Util.getStudySetID()}`)
  .then(response => {
    console.log(response);
    $scope.terms = response.data.terms;
  })
})



