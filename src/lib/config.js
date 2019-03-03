const convict = require('convict')
require('dotenv').config()

const config = convict({
  node_env: {
    doc: 'The Node application environment',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV'
  },
  discord_token: {
    doc: 'The Discord bot token (@see discordapp.com/developers)',
    format: String,
    default: null,
    env: 'DISCORD_TOKEN'
  },
  database: {
    host: {
      doc: 'The RethinkDB hostname',
      format: String,
      default: 'database',
      arg: 'db_host',
      env: 'DB_HOST'
    },
    port: {
      doc: 'The RethinkDB port',
      format: Number,
      default: '28015',
      arg: 'db_port',
      env: 'DB_PORT'
    },
    name: {
      doc: 'The RethinkDB database name',
      format: String,
      default: 'calendarbot',
      arg: 'db_name',
      env: 'DB_NAME'
    }
  }
})

config.validate({ allowed: 'strict' })

module.exports = config.getProperties()
