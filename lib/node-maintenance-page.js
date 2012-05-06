(function() {
  var Server, fs, http, path, static, sys, util;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  fs = require('fs');
  path = require('path');
  sys = util = require('util');
  http = require('http');
  static = require('node-static');
  this.version = [0, 1];
  Server = (function() {
    function Server(config) {
      this.config = config;
      if (this.configurationOk()) {
        sys.puts('Configuration is ok, now mounting your maintenance pages');
        this.configure();
        this.startServing();
      }
    }
    Server.prototype.configure = function() {
      sys.puts("Moutning path - " + this.config.mountPath);
      return this.staticServer = new static.Server(this.config.mountPath, {
        cache: 0
      });
    };
    Server.prototype.startServing = function() {
      sys.puts('Starting server...');
      http.createServer(__bind(function(request, response) {
        if (!request.url.match(/gif|jpg|jpeg|swf|png|css|js|bmp|ico/i)) {
          request.url = this.config.defaultPage;
        }
        return this.handleServerRequest(request, response);
      }, this)).listen(this.config.serverPort, this.config.serverHost);
      return sys.puts('Server started.');
    };
    Server.prototype.handleServerRequest = function(request, response) {
      return request.on('end', __bind(function() {
        return this.staticServer.serve(request, response);
      }, this));
    };
    Server.prototype.configurationOk = function() {
      var ok;
      ok = true;
      if (!(this.config.serverPort != null)) {
        ok = false;
        sys.puts('Server port is not defined');
      }
      if (!(this.config.serverHost != null)) {
        ok = false;
        sys.puts('Server host is not defined');
      }
      if (!(this.config.mountPath != null)) {
        ok = false;
        sys.puts('Server mount path is not defined');
      }
      return ok;
    };
    return Server;
  })();
  module.exports = {
    Server: Server
  };
}).call(this);
