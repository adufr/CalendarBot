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

  // roles configuration
  .add('roles', folder => folder
    .add('addtask', 'any', {
      default: null,
      configurable: true
    })
    .add('notify', 'any', {
      default: null,
      configurable: true
    }))

  // tasks
  .add('tasks', 'any', {
    array: true
  })
