(function() {
  var config, mServer, maintenancePage, optParse, parser, switches, sys, util;
  sys = require('sys');
  util = require('util');
  optParse = require('optparse');
  maintenancePage = require('../lib/node-maintenance-page');
  config = {
    serverPort: 80,
    serverHost: '0.0.0.0',
    mountPath: null,
    defaultPage: 'index.html'
  };
  switches = [['-h', '--help', 'Print this help'], ['-P', '--port NUMBER', 'Server port, by default 80'], ['-H', '--host HOST', 'Server host, by default 0.0.0.0'], ['-m', '--mount-dir FILE', 'Server directory from where index.html and related resources will be served, Required'], ['-d', '--default-page FILE', 'Default file, by default index.html']];
  parser = new optParse.OptionParser(switches);
  parser.on('port', function(arg, value) {
    return config.serverPort = value;
  });
  parser.on('host', function(arg, value) {
    return config.serverHost = value;
  });
  parser.on('mount-dir', function(arg, value) {
    return config.mountPath = value;
  });
  parser.on('default-page', function(arg, value) {
    return config.defaultPage = value;
  });
  parser.on('help', function() {
    return sys.puts(parser.toString());
  });
  parser.parse(process.ARGV);
  mServer = new maintenancePage.Server(config);
}).call(this);
