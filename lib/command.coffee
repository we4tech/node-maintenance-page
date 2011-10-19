sys = require('sys')
util = require('util')
optParse = require('optparse')
maintenancePage = require('../lib/node-maintenance-page')

# Take server port and host related configuration
config =
  serverPort: 80
  serverHost: '0.0.0.0'
  mountPath: null

# Define options
switches = [
    ['-h', '--help', 'Print this help']
  , ['-P', '--port NUMBER', 'Server port, by default 80']
  , ['-H', '--host HOST', 'Server host, by default 0.0.0.0']
  , ['-m', '--mount-dir FILE', 'Server directory from where index.html and related resources will be served, Required']
]

parser = new optParse.OptionParser(switches)

# Handle server port
parser.on 'port', (arg, value) ->
  config.serverPort = value

# Handle server host
parser.on 'host', (arg, value) ->
  config.serverHost = value

# Handle mount dir
parser.on 'mount-dir', (arg, value) ->
  config.mountPath = value

# Handle help
parser.on 'help', ->
  sys.puts(parser.toString());

parser.parse process.ARGV

# Kick start maintenance page
mServer = new maintenancePage.Server config