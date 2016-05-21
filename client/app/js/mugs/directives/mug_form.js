module.exports = function(app) {
  app.directive('mugsForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/mugs/directives/mug_form.html',
      scope: {
        mug: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateMug,
          create: controller.createMug
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
