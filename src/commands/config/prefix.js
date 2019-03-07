const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      cooldown: 5,
      permissionLevel: 6,
      aliases: ['setprefix', 'prefixe', 'p'],
      description: 'Change le préfixe du serveur actuel',
      usage: '[reset|prefix:str{1,10}]'
    })
    this.usageCustom = '%prefix'
    this.example = '%prefix'
  }

  async run (message, [prefix]) {
    if (!prefix) return message.reply(`le préfixe sur ce serveur est \`${message.guild.settings.prefix}\``)
    // if (!await message.hasAtLeastPermissionLevel(6)) throw message.language.get('INHIBITOR_PERMISSIONS')
    if (prefix === 'reset') return this.reset(message)
    if (message.guild.settings.prefix === prefix) throw message.language.get('CONFIGURATION_EQUALS')
    await message.guild.settings.update('prefix', prefix).then(() => {
      return message.reply(`le préfixe a bien été changé pour \`${prefix}\` <:success:538698744921849876>`)
    }).catch((err) => {
      this.client.console.error(err)
      return message.reply(`une erreur est survenue... <:error:538698717868458014>`)
    })
  }

  async reset (message) {
    await message.guild.settings.reset('prefix').then(() => {
      return message.reply(`le préfixe a été réinitialisé pour \`${this.client.options.prefix}\` <:success:538698744921849876>`)
    }).catch((err) => {
      this.client.console.error(err)
      return message.reply(`une erreur est survenue... <:error:538698717868458014>`)
    })
  }
}
