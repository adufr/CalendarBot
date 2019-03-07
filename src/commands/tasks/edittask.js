const { Command } = require('klasa')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      name: 'edittask',
      description: 'Edite une tâche',
      extendedHelp: 'Aucune aide complémentaire disponible.',
      cooldown: 5,
      permissionLevel: 5,
      aliases: ['modify', 'modif', 'edit', 'e'],
      runIn: ['text'],
      usage: '<index:int> <key:string> <newValue:string>',
      usageDelim: ' '
    })
    this.usageCustom = '%edit <index:int> <key:string> <newValue:string>'
    this.example = '%task edit 2 title Mathématiques'
  }

  async run (message, [index, key, ...newValue]) {
    if (!index) return message.reply('veuillez indiquer le numéro de la tâche que vous souhaitez modifier !')
    if (!key || !['titre', 'title', 'date', 'description', 'desc'].includes(key.toLowerCase())) return message.reply(`veuillez spécifier le champ que vous souhaitez effectuer sur la tâche indiquée (\`titre/date/description\`)`)
    if (!newValue) message.reply(`veuillez indiquer la nouvelle valeur du champ : ${key}`)

    const tasks = message.guild.settings.tasks
    tasks.sort(this.client.funcs.sortDueDates)

    const toEdit = tasks[index - 1]
    if (!toEdit) return message.reply(`aucune tâche trouvée... (vérifiez l'index indiqué) <:error:538698717868458014>`)

    switch (key) {
      case 'titre':
      case 'title':
        toEdit.title = newValue
        break
      case 'date':
        toEdit.due_date = newValue
        break
      case 'description':
      case 'desc':
        toEdit.description = newValue.join(' ')
        break
    }

    await message.guild.settings.update('tasks', tasks[index - 1], { action: 'remove' }).then(async () => {
      await message.guild.settings.update('tasks', toEdit).then(() => {
        message.reply(`la tâche **${toEdit.title}**  du **${toEdit.due_date}** a bien été modifiée ! <:success:538698744921849876>`)
      })
    }).catch((err) => {
      this.client.console.error(err)
      message.reply('une erreur est survenue... <:error:538698717868458014>')
    })
  }
}