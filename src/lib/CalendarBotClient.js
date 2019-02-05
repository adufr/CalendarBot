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
      defaultGuildSchema
    })
    this.funcs = funcs
  }
}

module.exports = CalendarBotClient
