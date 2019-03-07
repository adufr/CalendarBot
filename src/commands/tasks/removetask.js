const { Command } = require('klasa')

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
  }

  async run (message, [index]) {
    if (!index) return message.reply('veuillez indiquer le numéro de la tâche que vous souhaitez supprimer !')

    const tasks = message.guild.settings.tasks
    tasks.sort(this.client.funcs.sortDueDates)

    const toRemove = tasks[index - 1]
    if (!toRemove) return message.reply(`aucune tâche trouvée... (vérifiez l'index indiqué) <:error:538698717868458014>`)

    await message.guild.settings.update('tasks', tasks[index - 1], { action: 'remove' }).then(() => {
      message.reply(`la tâche **${toRemove.title}**  du **${toRemove.due_date}** a bien été supprimée ! <:success:538698744921849876>`)
    }).catch((err) => {
      this.client.console.error(err)
      message.reply('une erreur est survenue... <:error:538698717868458014>')
    })
  }
}
