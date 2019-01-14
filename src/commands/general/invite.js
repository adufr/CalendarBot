const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text', 'dm'],
      cooldown: 5,
      permissionLevel: 0,
      aliases: ['invitation', 'invite', 'add'],
      description: 'Donne le lien d\'invitation du bot'
    })
    this.usageCustom = '%invite'
    this.example = '%invite'
  }

  async run (message) {
    const embed = new MessageEmbed()
      .setColor('#3586ff')
      .setTitle(`Cliquez ici !`)
      .addField('Ajoutez moi sur votre serveur !', `Vous pouvez m'ajouter sur votre serveur, en cliquant sur [ce lien d'invitation](https://discordapp.com/oauth2/authorize?client_id=473070839085137933&scope=bot&permissions=1409674304&response_type=code).\n(Je n'utilise aucune permission superflues !)`)
      .setURL('https://discordapp.com/oauth2/authorize?client_id=473070839085137933&scope=bot&permissions=1409674304&response_type=code')
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    message.reply(`voici un lien d'invitation pour vous !`)
    message.send(embed)
  }
}
