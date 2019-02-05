const { Task } = require('klasa')

module.exports = class extends Task {
  constructor (...args) {
    super(...args, { name: 'tasklistChannelUpdater', enabled: true })
  }

  // Updates the tasklist channel for each guild
  // that has already configured it.
  async run () {
    this.client.guilds.forEach(guild => {
      this.client.funcs.updateTasklistChannel(this.client, guild.id)
    })
  }
}
