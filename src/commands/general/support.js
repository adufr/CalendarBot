const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text', 'dm'],
      permissionLevel: 0,
      requiredPermissions: ['USE_EXTERNAL_EMOJIS'],

      description: 'Donne le lien d\'invitation du serveur officiel',

      cooldown: 5
    })
    this.usageCustom = '%support'
    this.example = '%support'
  }

  async run (message) {
    const embed = new MessageEmbed()
      .setColor('#3586ff')
      .setTitle(`Rejoignez le discord officiel !`)
      .addField('CalendarBot\'s Support', `Un problème ? Une question ? [Rejoignez le discord officiel](https://discord.gg/6bwdrbV) où nous nous ferons une joie de pouvoir vous aider !`)
      .setURL('https://discord.gg/6bwdrbV')
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    message.reply(`et voilà ton invitation !`)
    message.send(embed)
    message.send('https://discord.gg/6bwdrbV')
  }
}
