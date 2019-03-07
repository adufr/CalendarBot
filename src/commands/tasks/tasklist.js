const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      cooldown: 10,
      permissionLevel: 0,
      aliases: ['tasks', 'task', 't', 'taches', 'tache', 'devoirs', 'd', 'devoir'],
      requiredPermissions: ['USE_EXTERNAL_EMOJIS'],
      description: 'Affiche la liste des tâches',
      usage: '<update|show:default>',
      subcommands: true
    })
    this.usageCustom = '%tasklist'
    this.example = '%tasklist'
  }

  run (message, [type, ...params]) {
    return this[type](message, params)
  }

  async show (msg) {
    const embed = await this.client.funcs.getTasklistEmbed(this.client, msg.channel)
    if (embed) msg.send(embed)
  }

  async update (msg) {
    if (!await msg.hasAtLeastPermissionLevel(5)) {
      return msg.reply(msg.language.get('INHIBITOR_PERMISSIONS'))
    }

    if (!msg.guild.settings.channels.tasklist) {
      return msg.reply(`aucun channel n'a été défini pour afficher la liste des tâches... <:error:538698717868458014>`)
    }

    await this.client.funcs.updateTasklistChannel(this.client, msg.guild.id).then(() => {
      return msg.reply(`le calendrier a bien été mis-à-jour !`)
    }).catch((err) => {
      this.client.console.error(err)
      return msg.reply(`une erreur est survenue lors de la mise-à-jour du calendrier`)
    })
  }
}
