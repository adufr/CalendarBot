const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')
const packageJson = require('../../../package.json')
const moment = require('moment')
require('moment-duration-format')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 0,
      requiredPermissions: ['USE_EXTERNAL_EMOJIS'],

      aliases: ['informations', 'information', 'infos', 'i', 'bot', 'src'],
      description: 'Affiche des informations sur le bot',

      cooldown: 5
    })
    this.usageCustom = '%info'
    this.example = '%info'
  }

  async run (message) {
    // retrieve and format the uptime
    const uptime = moment.duration(this.client.uptime).format(' D [jour], H [h] et m [minute], s [s]')

    // constructing message's body
    var desc = ''
    desc += '**`' + this.client.funcs.beautify('Version du bot', 20) + '`** : v' + packageJson.version + '\n'
    desc += '**`' + this.client.funcs.beautify('Version discordjs', 20) + '`** : master\n'
    desc += '**`' + this.client.funcs.beautify('Version klasa.js', 20) + '`** : master\n'
    desc += '**`' + this.client.funcs.beautify('Version nodejs', 20) + '`** : ' + process.version + '\n'
    desc += '**`' + this.client.funcs.beautify('Code source', 20) + '`** : [Woosy/CalendarBot](https://github.com/Woosy/CalendarBot) \n'
    desc += '---------------------------\n'
    desc += '**`' + this.client.funcs.beautify('Uptime', 20) + '`** : ' + uptime + '\n'
    desc += '**`' + this.client.funcs.beautify('Utilisation mémoire', 20) + '`** : ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB\n'
    desc += '---------------------------\n'
    desc += '**`' + this.client.funcs.beautify('Serveurs', 20) + '`** : ' + this.client.guilds.size + '\n'
    desc += '**`' + this.client.funcs.beautify('Channels', 20) + '`** : ' + this.client.channels.size + '\n'
    desc += '**`' + this.client.funcs.beautify('Utilisateurs', 20) + '`** : ' + this.client.users.size + '\n'

    // response
    const embed = new MessageEmbed()
      .setColor('#3586ff')
      .setAuthor(this.client.user.username, this.client.user.avatarURL)
      .setTitle('Informations :')
      .setDescription(desc)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp()

    // sends the reponse
    message.channel.send(embed)
  }
}
