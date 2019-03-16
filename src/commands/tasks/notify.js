const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'notify',
      description: "Recevoir une notification avant qu'une tâche arrive à expiration",
      extendedHelp: 'Aucune aide complémentaire disponible.',
      cooldown: 5,
      permissionLevel: 0,
      aliases: ['notification', 'notifs', 'notif'],
      runIn: ['text']
    })
    this.usageCustom = '%notify'
    this.example = '%notif'
  }

  async run (message) {
    const guild = message.guild
    if (!guild) return

    // if there is a configured role
    let role = await guild.roles.find(role => role.id === guild.settings.roles.notify)
    if (role) {
      return updateRole(this.client, message, role)
    // otherwise use the bot's default role
    } else {
      role = await guild.roles.find(role => role.name === 'calendarbot_notify' === true)
      if (role == null || !guild.roles.has(role.id)) {
        // role creation
        await guild.roles.create({
          data: {
            name: 'calendarbot_notify',
            mentionable: true
          }
        }).then((result) => {
          // sets the role to the user
          return updateRole(this.client, message, result.id)
        }).catch((err) => {
          this.client.console.error(err)
          return message.reply('une erreur est survenue...\nSi cela persiste, rejoignez le discord de support ! discord.gg/ff4f52s')
        })
      } else {
        // sets the role to the user
        return updateRole(this.client, message, role)
      }
    }
  }
}

// Updates user's role depending of him
// already having it or not
function updateRole (client, message, role) {
  // if he already has the role
  if (message.member.roles.find(val => val.id === role.id)) {
    message.member.roles.remove(role)
    return message.reply(`vous **ne recevrez plus** de notifications. ${client.emotes.success}`)
  } else {
    message.member.roles.add(role)
    return message.reply(`vous **serez notifié** des devoirs à faire à J-1. ${client.emotes.success}`)
  }
}
