module.exports = function(app) {
  app.directive('vinylForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/vinyl/directives/vinyl_form.html',
      scope: {
        vinyl: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateVinyl,
          create: controller.createVinyl
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
