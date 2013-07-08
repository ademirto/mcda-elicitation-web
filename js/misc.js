function exampleProblem() {
  return {
    "title": "Thrombolytics Example",
    "criteria": {
      "Prox DVT": {
        "title": "Proximal DVT",
        "pvf": {
          "range": [
            0.0,
            0.25
          ],
          "type": "linear-decreasing"
        }
      },
      "Dist DVT": {
        "title": "Distal DVT",
        "pvf": {
          "range": [
            0.15,
            0.4
          ],
          "type": "linear-decreasing"
        }
      },
      "Bleed": {
        "title": "Major bleeding",
        "pvf": {
          "range": [
            0.0,
            0.1
          ],
          "type": "linear-decreasing"
        }
      }
    },
    "alternatives": {
      "Hep": {
        "title": "Heparin"
      },
      "Enox": {
        "title": "Enoxaparin"
      }
    },
    "performanceTable": [
      {
      "alternative": "Hep",
      "criterion": "Prox DVT",
      "performance": {
        "type": "dbeta",
        "parameters": { "alpha": 20, "beta": 116 }
      }
    },
    {
      "alternative": "Hep",
      "criterion": "Dist DVT",
      "performance": {
        "type": "dbeta",
        "parameters": { "alpha": 40, "beta": 96 }
      }
    },
    {
      "alternative": "Hep",
      "criterion": "Bleed",
      "performance": {
        "type": "dbeta",
        "parameters": { "alpha": 1, "beta": 135 }
      }
    },
    {
      "alternative": "Enox",
      "criterion": "Prox DVT",
      "performance": {
        "type": "dbeta",
        "parameters": { "alpha": 8, "beta": 121 }
      }
    },
    {
      "alternative": "Enox",
      "criterion": "Dist DVT",
      "performance": {
        "type": "dbeta",
        "parameters": { "alpha": 32, "beta": 97 }
      }
    },
    {
      "alternative": "Enox",
      "criterion": "Bleed",
      "performance": {
        "type": "dbeta",
        "parameters": { "alpha": 5, "beta": 124 }
      }
    }
    ],
    "preferences": {}
  }
}

var app = angular.module('elicit', ['clinicico', 'elicit.example', 'elicit.components', 'elicit.services']);
app.run(['$rootScope', function($rootScope) {
  $rootScope.$safeApply = function($scope, fn) {
    fn = fn || function() {};
    if($scope.$$phase) {
      //don't worry, the value gets set and AngularJS picks up on it...
      fn();
    }
    else {
      //this will fire to tell angularjs to notice that a change has happened
      //if it is outside of it's own behaviour...
      $scope.$apply(fn);
    }
  };
}]);
