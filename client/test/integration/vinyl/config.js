
  exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    },
    onPrepare: function() {
      require('babel-core/register');
    }
  };
