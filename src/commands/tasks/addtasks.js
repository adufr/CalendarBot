const { Command } = require('klasa')
const moment = require('moment')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'addtask',
      description: 'Rajoute une tâche',
      extendedHelp: 'Aucune aide complémentaire disponible.',
      cooldown: 5,
      permissionLevel: 0,
      aliases: ['addtasks', 'addtask', 'add', 'at'],
      runIn: ['text'],
      usage: '<titre:string> <due_date:date> [description:string]  [...]',
      usageDelim: ' '
    })
    this.usageCustom = '%addtask <titre:string> <dueDate:string> [description:string]'
    this.example = "%addtask Maths 28/10/18 Faire l'exercice 69 de la page 420."
  }

  async run (message, [titre, dueDate, ...description]) {
    // if the 'addtask' role is set:
    // adding tasks is restricted to people who have this role
    const role = message.guild.roles.find(role => role.id === message.guild.settings.roles.addtask)
    if (role) {
      if (!message.member.roles.find(r => r.id === role.id)) {
        return message.reply(`Vous n'avez pas la permission d'utiliser cette commande.`)
      }
    }

    // sets the task
    // notify user that it has been saved
    const date = moment(dueDate).format('DD/MM/YY')
    const task = {
      title: titre,
      due_date: date,
      description: description.join(' '),
      author: message.author.tag
    }
    await message.guild.settings.update('tasks', task)
    return message.reply(`votre tâche : **${titre}**, pour le **${date}** a bien été ajoutée ! <:success:538698744921849876>`)
  }
}
