const { KlasaClient } = require('klasa')

module.exports = KlasaClient.defaultGuildSchema

  // channels configuration
  .add('channels', folder => folder
    .add('tasks', 'TextChannel', {
      default: null,
      configurable: true
    })
    .add('notifications', 'TextChannel', {
      default: null,
      configurable: true
    }))

  // tasks
  .add('tasklist', folder => folder
    .add('tasks', 'any', {
      array: true
    }))
