const { Client } = require('klasa')

// Plugins
Client.use(require('klasa-member-gateway'))

// Schemas
const defaultGuildSchema = require(`./schemas/defaultGuildSchema`)

// Others
const funcs = require('./funcs')
const permissionLevels = require('./permissionLevels')

class CalendarBotClient extends Client {
  constructor (options) {
    super({ ...options,
      permissionLevels,
      defaultGuildSchema,
      disabledCorePieces: ['commands']
    })
    this.funcs = funcs
    this.emotes = { success: '<:success:538698744921849876>', error: '<:error:538698717868458014>' }
  }
}

module.exports = CalendarBotClient
