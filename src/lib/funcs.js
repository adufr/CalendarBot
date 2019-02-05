const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
  // Manages text alignement
  // (adds some dots (".") depending of the size of
  // the string passed as a parameter)
  beautify (string, size) {
    if (string.length < size) {
      for (let i = 0; i < size; i++) {
        if (string.length < size) string += '.'
      }
    }
    return string
  },

  // Sorts dates
  sortDueDates (a, b) {
    return moment(a.due_date, 'DD-MM-YY') - moment(b.due_date, 'DD-MM-YY')
  },

  // Updates the tasklist channel of a given guild
  updateTasklistChannel (client, guildId) {
    this.client = client

    const guild = this.client.guilds.find(guild => guild.id === guildId)
    if (!guild) this.client.console.error(`Tried to update a tasklist channel of an unknown guild (${guildId})`)

    // if there is a configuredchannel
    const channelId = guild.settings.channels.tasklist
    if (!channelId) return

    // if the channel is valid
    const channel = guild.channels.find(channel => channel.id === channelId)
    if (!channel) return

    // if bot's last msg is already a tasklist: delete & post new one
    // otherwise, do nothing but posting the new one
    const lastMessage = channel.messages.last()
    if (lastMessage && lastMessage.author.id === this.client.user.id) {
      lastMessage.delete()
    }

    // Calls the Tasklist Embed builder
    const embed = this.client.funcs.getTasklistEmbed(this.client, channel)
    if (!embed) return

    channel.send(embed)
      .then(() => {
        this.client.console.log(`Updated tasklist channel of ${channel.guild.name} (${channel.guild.id})!`)
      })
      .catch((error) => {
        this.client.console.error(`An error occured whilst tring update tasklist channel (${error})`)
      })
  },

  // Builds the tasklist embed
  getTasklistEmbed (client, channel) {
    this.client = client

    // Embed avec la liste des tâches
    const embed = new MessageEmbed()
      .setColor(4886754)
      .setTimestamp()
      .setFooter('Dernière mise-à-jour', this.client.user.displayAvatarURL())

    // If there are no tasks on this server
    if (!channel.guild.settings.tasks || !channel.guild.settings.tasks[0]) {
      embed.setDescription(`Il n'y a **aucune tâche à venir**...\nPour en ajouter, veuillez exécuter la commande \`%addtask\` ou vous référer à l'aide avec la commande \`%help addtask\`.`)
      return embed
    }

    embed.setThumbnail(this.client.user.displayAvatarURL())

    // Verifie si la date du devoir est aujourd'hui
    // Si oui, cela va afficher Aujourd'hui dans l'affichage des devoirs
    const currentDate = new Date(Date.now())
    const aujourdhui = moment(currentDate).format('DD/MM/YY')

    // Verifie si la date du devoir est demain
    // Si oui, cela va afficher Demain dans l'affichage des devoirs
    const demain = moment(currentDate.setDate(currentDate.getDate() + 1)).format('DD/MM/YY')

    // Retrieves all guild's tasks
    // and sorts them by date
    const tasks = channel.guild.settings.tasks
    tasks.sort(this.client.funcs.sortDueDates)
    tasks.forEach(task => {
      // task date
      let date = moment(task.due_date, 'DD-MM-YY').format('DD/MM/YY')
      let weekday = moment(task.due_date, 'DD-MM-YY').isoWeekday()
      let formatedDate = this.formatDate(date, weekday)
      let changed = false

      // For each field
      embed.fields.forEach((field) => {
        // if there's already a field with this date
        if (field.name === formatedDate || (field.name === "Aujourd'hui :" && date === aujourdhui) || (field.name === 'Demain :' && date === demain)) {
          field.value += `\n**\`${this.client.funcs.beautify(task.title, 14)}\`** - ${task.description || 'Aucune description'}`
          changed = true
        }
      })

      if (!changed) {
        if (date === aujourdhui) {
          embed.addField(`Aujourd'hui :`, `**\`${this.client.funcs.beautify(task.title, 14)}\`** - ${task.description || 'Aucune description'}`)
        } else if (date === demain) {
          embed.addField('Demain :', `**\`${this.client.funcs.beautify(task.title, 14)}\`** - ${task.description || 'Aucune description'}`)
        } else {
          embed.addField(formatedDate, '**`' + this.client.funcs.beautify(task.title, 14) + '`** - ' + task.description)
        }
      }
    })

    return embed
  },

  // Builds the notification embed
  getNotificationEmbed (client, channel) {
    this.client = client

    // If there are no tasks on this server
    if (!channel.guild.settings.tasks || !channel.guild.settings.tasks[0]) return null

    // Gets all tasks that are due to tomorrow
    let embedDescription = ''
    channel.guild.settings.tasks.forEach(task => {
      if (moment(task.due_date, 'DD/MM/YY') <= moment().add(1, 'day')) {
        embedDescription += `\n**\`${this.beautify(task.title, 14)}\`** - ${task.description}`
      }
    })

    // If there are no tasks for tomorrow
    if (!embedDescription) return null

    // Embed with tasks list
    const embed = new MessageEmbed()
      .setColor(4886754)
      .setTitle('Tâches pour demain :')
      .setDescription(embedDescription)
      .setTimestamp()
      .setFooter('Dernière mise-à-jour', this.client.user.displayAvatarURL())

    return embed
  },

  // Builds and returns a formatted string from the input
  formatDate (date, weekday) {
    let temp = date.toString().split('/')

    var jour = ''
    switch (weekday) {
      case 1:
        jour = 'Lundi'
        break
      case 2:
        jour = 'Mardi'
        break
      case 3:
        jour = 'Mercredi'
        break
      case 4:
        jour = 'Jeudi'
        break
      case 5:
        jour = 'Vendredi'
        break
      case 6:
        jour = 'Samedi'
        break
      case 7:
        jour = 'Dimanche'
        break
    }

    var mois = ''
    switch (temp[1]) {
      case '01':
        mois = 'Janvier'
        break
      case '02':
        mois = 'Février'
        break
      case '03':
        mois = 'Mars'
        break
      case '04':
        mois = 'Avril'
        break
      case '05':
        mois = 'Mai'
        break
      case '06':
        mois = 'Juin'
        break
      case '07':
        mois = 'Juillet'
        break
      case '08':
        mois = 'Août'
        break
      case '09':
        mois = 'Septembre'
        break
      case '10':
        mois = 'Octobre'
        break
      case '11':
        mois = 'Novembre'
        break
      case '12':
        mois = 'Décembre'
        break
    }
    return `${jour} ${temp[0]} ${mois} :`
  }

}
