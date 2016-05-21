module.exports = function(app) {
  app.directive('mugListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/mugs/directives/mug_list_item.html',
      scope: {
        mug: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeMug;
      }
    };
  });
};
