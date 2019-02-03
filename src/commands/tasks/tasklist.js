const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      cooldown: 10,
      permissionLevel: 0,
      aliases: ['tasks', 'task', 't', 'taches', 'tache', 'devoirs', 'd', 'devoir'],
      requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
      description: 'Affiche la liste des tâches'
    })
    this.usageCustom = '%tasklist'
    this.example = '%tasklist'
  }

  async run (msg) {
    // Calls the Tasklist Embed builder
    const embed = this.client.funcs.getTasklistEmbed(this.client, msg.channel)
    if (embed) msg.send(embed)
  }
}
