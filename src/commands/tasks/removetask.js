const { Command } = require('klasa')
const moment = require('moment')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'removetask',
      description: 'Supprime une tâche',
      extendedHelp: 'Aucune aide complémentaire disponible.',
      cooldown: 5,
      permissionLevel: 5,
      aliases: ['deletetask', 'delete', 'remove', 'rmt', 'rm'],
      runIn: ['text'],
      usage: '<index:int>',
      usageDelim: ' '
    })
    this.usageCustom = '%removetask <index:int>'
    this.example = '%task remove 2'
    this.hidden = true
  }

  async run (message, [index]) {
    if (!index) return message.reply('veuillez indiquer le numéro de la tâche que vous souhaitez supprimer !')

    const tasks = message.guild.settings.tasks.filter(task => moment(task.due_date, 'DD-MM-YY') >= new Date().setDate(new Date().getDate() - 1))
    tasks.sort(this.client.funcs.sortDueDates)

    const toRemove = tasks[index - 1]
    if (!toRemove) return message.reply(`aucune tâche trouvée... (vérifiez l'index indiqué) ${this.client.emotes.error}`)

    await message.guild.settings.update('tasks', tasks[index - 1], { action: 'remove' }).then(async () => {
      await this.client.funcs.updateTasklistChannel(this.client, message.guild.id)
      message.reply(`la tâche **${toRemove.title}**  du **${toRemove.due_date}** a bien été supprimée ! ${this.client.emotes.success}`)
    }).catch((err) => {
      this.client.console.error(err)
      message.reply(`une erreur est survenue... ${this.client.emotes.error}`)
    })
  }
}
