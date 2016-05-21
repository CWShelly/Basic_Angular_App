module.exports = function(app) {
  app.directive('vinylListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/vinyl/directives/vinyl_list_item.html',
      scope: {
        vinyl: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeVinyl;
      }
    };
  });
};
