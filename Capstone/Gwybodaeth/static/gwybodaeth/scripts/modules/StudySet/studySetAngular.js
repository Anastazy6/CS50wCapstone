// Experimental

import { StudySet } from "./study_set.mjs";
import { Load }     from "../Load/load.mjs";


const app = angular.module('studySet', []);

app.controller('studySetController', function($scope) {
  $scope.terms = Load.justTerms((terms) => {return terms});
  $scope.test  = "If this is visible, then angular works";
})



const test = (terms) => {
  console.log(terms);
  Object.entries(terms).forEach(term => {
    console.log(term[1]);
  })
  return terms;
}