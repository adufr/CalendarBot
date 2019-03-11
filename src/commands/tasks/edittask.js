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
    this.hidden = true
  }

  async run (message, [index, key, ...newValue]) {
    if (!index) return message.reply('veuillez indiquer le numéro de la tâche que vous souhaitez modifier !')
    if (!key || !['titre', 'title', 'date', 'description', 'desc', 'all', '*'].includes(key.toLowerCase())) return message.reply(`veuillez spécifier le champ que vous souhaitez effectuer sur la tâche indiquée (\`titre/date/description\`)`)
    if (!newValue) message.reply(`veuillez indiquer la nouvelle valeur du champ : \`${key}\``)

    const tasks = message.guild.settings.tasks
    tasks.sort(this.client.funcs.sortDueDates)

    const toEdit = tasks[index - 1]
    if (!toEdit) return message.reply(`aucune tâche trouvée... (vérifiez l'index indiqué) ${this.client.emotes.error}`)

    switch (key) {
      case 'titre':
      case 'title':
        toEdit.title = newValue
        break
      case 'date':
        if (!this.client.arguments.get('date').run(newValue, message)) return
        toEdit.due_date = newValue
        break
      case 'description':
      case 'desc':
        toEdit.description = newValue.join(' ')
        break
      case 'all':
      case '*':
        newValue = newValue[0].split(new RegExp(/ /g))
        if (!newValue[0]) return message.reply(`veuillez spécifier le titre de votre tâche.`)
        if (!newValue[1]) return message.reply(`veuillez indiquer la date de votre tâche \`(DD/MM/YY)\`.`)
        if (!this.client.arguments.get('date').run(newValue[1], message)) return
        toEdit.title = newValue[0]
        newValue.shift()
        toEdit.due_date = newValue[0]
        newValue.shift()
        toEdit.description = newValue.join(' ')
        break
    }

    await message.guild.settings.update('tasks', tasks[index - 1], { action: 'remove' }).then(async () => {
      await message.guild.settings.update('tasks', toEdit).then(async () => {
        await this.client.funcs.updateTasklistChannel(this.client, message.guild.id)
        message.reply(`la tâche **${toEdit.title}**  du **${toEdit.due_date}** a bien été modifiée ! ${this.client.emotes.success}`)
      })
    }).catch((err) => {
      this.client.console.error(err)
      message.reply(`une erreur est survenue... ${this.client.emotes.error}`)
    })
  }
}
