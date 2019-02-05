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
  }
})

config.validate({ allowed: 'strict' })

module.exports = config.getProperties()
