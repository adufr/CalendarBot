const CalendarBotClient = require('./lib/CalendarBotClient')
const packageJson = require('../package.json')
const config = require('./lib/config')

const client = new CalendarBotClient({
  production: config.node_env,
  ownerID: '255065617705467912',
  language: 'fr-FR',
  prefix: '%',
  typing: false,
  noPrefixDM: false,
  commandEditing: true,
  commandLogging: true,
  prefixCaseInsensitive: false,
  pieceDefaults: {
    commands: {
      bucket: 2,
      deletable: true,
      quotedStringSupport: true
    }
  },
  providers: {
    default: 'rethinkdb',
    rethinkdb: { db: 'calendarbot', servers: [{ host: config.database.host, port: config.database.port }] }
  },
  presence: {
    activity: {
      type: 'WATCHING',
      name: `%help - ${packageJson.version}`
    }
  },
  console: {
    useColor: true,
    timestamps: 'DD-MM-YYYY HH:mm:ss'
  },
  consoleEvents: { verbose: true }
})

client.login()
