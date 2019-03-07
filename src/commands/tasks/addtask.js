const { Command } = require('klasa')
const moment = require('moment')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'addtask',
      description: 'Rajoute une tâche',
      extendedHelp: 'Aucune aide complémentaire disponible.',
      cooldown: 5,
      permissionLevel: 1,
      aliases: ['addtasks', 'addtask', 'add', 'at'],
      runIn: ['text'],
      usage: '<titre:string> <due_date:date> [description:string] [...]',
      usageDelim: ' '
    })
    this.usageCustom = '%addtask <titre:string> <dueDate:string> [description:string]'
    this.example = "%addtask Maths 28/10/18 Faire l'exercice 69 de la page 420."
  }

  async run (message, [titre, dueDate, ...description]) {
    if (!titre) return message.reply('veuillez indiquer le titre de votre tâche !')
    if (!dueDate) return message.reply('veuillez indiquer la date de votre tâche (`DD/MM/YY`) !')

    // sets the task
    // notify user that it has been saved
    const date = moment(dueDate, 'DD/MM/YY').format('DD/MM/YY')
    const task = {
      title: titre,
      due_date: date,
      description: description.join(' '),
      author: message.author.tag
    }

    await message.guild.settings.update('tasks', task).then(async () => {
      await this.client.funcs.updateTasklistChannel(this.client, message.guild.id)
      message.reply(`votre tâche : **${titre}**, pour le **${date}** a bien été ajoutée ! <:success:538698744921849876>`)
    }).catch((err) => {
      this.client.console.error(err)
      message.reply('une erreur est survenue... <:error:538698717868458014>')
    })
  }
}
