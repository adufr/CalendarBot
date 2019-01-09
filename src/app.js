const CalendarBotClient = require('./lib/CalendarBotClient')
const packageJson = require('../package.json')
const config = require('../config')

const client = new CalendarBotClient({
  production: process.env.ENV === 'production',
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

client.login(config.token)
