const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'conf',
      cooldown: 5,
      permissionLevel: 6,
      aliases: ['configuration', 'config', 'cfg'],
      runIn: ['text'],
      description: 'Permet de configurer le bot',
      extendedHelp: 'La commande conf permet de configurer le bot à votre guise.\n\n__Exemples de configuration :__\n' +
      '```' +
      '!conf channel tasklist #tasklist\n' +
      '!conf channel notifications #notifs\n' +
      '!conf role addtask <@Membre|everyone>\n' +
      '!conf role notify <@role|everyone>```'
    })
    this.usageCustom = 'cf. au-dessus'
    this.example = '%cfg channel tasklist #tasklist'
  }

  async run (message) {
    // retrieves arguments
    const args = message.content.split(' ')
    args.shift()

    const el = args[0]
    const key = args[1]
    var value = args[2]
    // ===========================
    // == channel configuration
    // ===========================
    if (el === 'channel' || el === 'salon' || el === 'chan') {
      switch (key) {
        // tasklist
        case 'tasklist':
        case 'tasks':
          value = getChannel(message, value)
          if (value === null) return
          message.guild.settings.update('channels.tasklist', value.id)
          message.reply(`la liste des tâches s'affichera désormais dans le channel \`#${value.name}\` ! <:success:538698744921849876>`)
          break
        // notifications
        case 'notifications':
        case 'notification':
        case 'notifs':
        case 'notif':
          value = getChannel(message, value)
          if (value === null) return
          message.guild.settings.update('channels.notifications', value.id)
          message.reply(`les notifications s'afficheront désormais dans le channel \`#${value.name}\` ! <:success:538698744921849876>`)
          break
        // invalid key
        default:
          message.reply(`quelle channel souhaitez-vous configurer ? (possibilités : \`tasklist, notifications)\``)
          break
      }
    // ===========================
    // == role configuration
    // ===========================
    } else if (el === 'role' || el === 'rank' || el === 'role') {
      switch (key) {
        // tasklist
        case 'addtask':
        case 'taskadd':
        case 'tasks':
        case 'task':
          value = getRole(message, value)
          if (value === null) return
          message.guild.settings.update('roles.addtask', value.id || 'everyone')
          message.reply(`les personnes avec le rôle \`@${value.name || 'everyone'}\` pourront désormais ajouter des tâches ! <:success:538698744921849876>`)
          break
        // notifications
        case 'notifications':
        case 'notification':
        case 'notify':
        case 'notifs':
        case 'notif':
          value = getRole(message, value)
          if (value === null) return
          message.guild.settings.update('roles.notify', value.id || 'everyone')
          message.reply(`les personnes avec le role \`@${value.name || 'everyone'}\` recevront désormais des notifications ! <:success:538698744921849876>`)
          break
        // invalid key
        default:
          message.reply(`quelle rôle souhaitez-vous configurer ? (possibilités : \`tasklist, notifications)\``)
          break
      }
    // ===========================
    // == helps to modify the conf:
    // ===========================
    } else if (el === 'help' || el === 'h') {
      message.reply(`quelle catégorie d'élément souhaitez-vous configurer ? (possibilités : \`channel, role)\`)`)
    // ===========================
    // == show conf: help
    // ===========================
    } else {
      const stgs = message.guild.settings
      let str

      const embed = new MessageEmbed()
        .setColor(4886754)
        .setTitle('Configuration actuelle')
        .setDescription('Tapez `%conf help` pour obtenir de l\'aide avec la configuration')
        .setTimestamp()
        .setFooter('Configuration', this.client.user.displayAvatarURL())

      // #tasklist
      if (stgs.channels && stgs.channels.tasklist) str = `<#${stgs.channels.tasklist}>`
      else str = 'aucun channel défini'
      embed.addField('Channel tasklist', str, true)
      // #notifications
      if (stgs.channels && stgs.channels.notifications) str = `<#${stgs.channels.notifications}>`
      else str = 'aucun channel défini'
      embed.addField('Channel notifications', str, true)

      // @add_task
      if (stgs.roles && stgs.roles.addtask) str = `@${message.guild.roles.find(r => r.id === stgs.roles.addtask).name}`
      else str = '@everyone'
      embed.addField('Rôle ajout de tâches', str, true)
      // @notify
      if (stgs.roles && stgs.roles.notify) str = `@${message.guild.roles.find(r => r.id === stgs.roles.notify).name}`
      else str = 'aucun rôle défini'
      embed.addField('Rôle recevant les notifs', str)

      message.channel.send(embed)
    }
  }
}

function getChannel (message, value) {
  // if no value provided
  if (!value) {
    message.reply(`veuillez spécifier un channel ! (\`nom, id, ou #mention\`)`)
    return null
  }
  // if value is a channel
  if (message.guild.channels.find(channel => channel.name === value || channel.id === value)) {
    return message.guild.channels.find(channel => channel.name === value || channel.id === value)
  } else if (message.mentions.channels.first()) {
    return message.mentions.channels.first()
  } else {
    message.reply(`je n'ai pas trouvé le channel indiqué... (Essayez avec : \`nom, id, ou #mention\`)`)
    return null
  }
}

function getRole (message, value) {
  // if no value provided
  if (!value) {
    message.reply(`veuillez spécifier un rôle ! (\`nom, id, ou @mention\`)`)
    return null
  }
  // if value is a role
  if (value === 'everyone' || value === 'all') {
    return 'everyone'
  } else if (message.guild.roles.find(role => role.name === value || role.id === value)) {
    return message.guild.roles.find(role => role.name === value || role.id === value)
  } else if (message.mentions.roles.first()) {
    return message.mentions.roles.first()
  } else {
    message.reply(`je n'ai pas trouvé le rôle indiqué... (Essayez avec : \`nom, id, ou #mention\`)`)
    return null
  }
}
