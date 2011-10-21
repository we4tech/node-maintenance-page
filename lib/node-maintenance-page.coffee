# Include global required libraries
fs = require 'fs'
sys = require 'sys'
path = require 'path'
util = require 'util'
http = require 'http'
static = require 'node-static'

# Include our implementation

@version = [0, 1]

class Server

  constructor: (@config) ->
    if @configurationOk()
      sys.puts('Configuration is ok, now mounting your maintenance pages')
      @configure()
      @startServing()

  #
  # Configure server
  configure: ->
    sys.puts "Moutning path - #{@config.mountPath}"
    @staticServer = new static.Server(@config.mountPath, { cache: 0 })

  #
  # Start static server to serve maintenance page
  startServing: ->
    sys.puts 'Starting server...'
    http.createServer((request, response) =>
      console.log("Original request - #{request.url}")
      request.url = @config.defaultPage

      @handleServerRequest(request, response)
    ).listen(@config.serverPort, @config.serverHost)
    sys.puts 'Server started.'

  #
  # Handle server request
  handleServerRequest: (request, response) ->
    request.on 'end', =>
      @staticServer.serve(request, response)

  #
  # Verify whether server port, host and mount path is specified or warn user.
  configurationOk: ->
    ok = true
    if !@config.serverPort?
     ok = false
     sys.puts 'Server port is not defined'

    if !@config.serverHost?
     ok = false
     sys.puts 'Server host is not defined'

    if !@config.mountPath?
      ok = false
      sys.puts 'Server mount path is not defined'

    ok

module.exports =
  Server: Server
