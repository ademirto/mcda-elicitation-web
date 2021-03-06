'use strict';
define(['angular', 'mcda/config', 'underscore'],
  function(angular, Config, _) {

    var dependencies = [];

    var MCDARouteProvider = function() {

      return {
        buildRoutes: function($stateProvider, parentState, baseTemplatePath) {

          $stateProvider.state(parentState + '.scenario', {
            url: '/scenarios/:id',
            templateUrl: baseTemplatePath + 'scenario.html',
            controller: 'ScenarioController',
            resolve: {
              currentScenario: ['$stateParams', 'ScenarioResource', 'PartialValueFunction',
                function($stateParams, ScenarioResource, PartialValueFunction) {
                  return ScenarioResource.get($stateParams, function(scenario) {
                    scenario.state = PartialValueFunction.attach(scenario.state);
                  }).$promise;
                }
              ],
              scenarios: ['$stateParams', 'ScenarioResource', 
                function($stateParams, ScenarioResource) {
                  return ScenarioResource.query(_.omit($stateParams, 'id')).$promise;
                }
              ]
            }
          });

          angular.forEach(Config.tasks.available, function(task) {
            var templateUrl = baseTemplatePath + task.templateUrl;
            $stateProvider.state(task.id, {
              parent: parentState + '.scenario',
              url: '/' + task.id,
              templateUrl: templateUrl,
              controller: task.controller,
              resolve: {
                taskDefinition: function(TaskDependencies) {
                  var def = TaskDependencies.extendTaskDefinition(task);
                  return def;
                }
              }
            });
          });
        },
        $get: function() {

        }
      };

    };

    return angular.module('elicit.routeFactory', dependencies).provider('MCDARoute', MCDARouteProvider);
  });