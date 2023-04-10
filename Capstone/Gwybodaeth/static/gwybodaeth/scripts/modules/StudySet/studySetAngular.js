// Experimental
import { Util } from "../Utilities/util.mjs";


const studySetApp = angular.module('studySet', []);


studySetApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol  ('}]}');
});


studySetApp.controller('studySetController', function($scope, $http) {
  $http.get(`/load/${Util.getStudySetID()}`)
  .then(response => {
    $scope.terms = response.data.terms;

    addMissingData($scope.terms);
    })
})




const addMissingData = (terms) => {
  Object.entries(terms).forEach(term => {
    if (! term[1].note || term[1].note === '') {term[1].note = "No note"}

    term[1].id = term[0];

  })
}
