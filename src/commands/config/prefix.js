const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 6,
      requiredPermissions: ['USE_EXTERNAL_EMOJIS'],

      aliases: ['setprefix', 'prefixe', 'p'],
      usage: '[reset|prefix:str{1,10}]',
      description: 'Change le préfixe du serveur actuel',

      cooldown: 5
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
      return message.reply(`le préfixe a bien été changé pour \`${prefix}\` ${this.client.emotes.success}`)
    }).catch((err) => {
      this.client.console.error(err)
      return message.reply(`une erreur est survenue... ${this.client.emotes.error}`)
    })
  }

  async reset (message) {
    await message.guild.settings.reset('prefix').then(() => {
      return message.reply(`le préfixe a été réinitialisé pour \`${this.client.options.prefix}\` ${this.client.emotes.success}`)
    }).catch((err) => {
      this.client.console.error(err)
      return message.reply(`une erreur est survenue... ${this.client.emotes.error}`)
    })
  }
}
