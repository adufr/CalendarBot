const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      runIn: ['text'],
      permissionLevel: 0,
      requiredPermissions: ['USE_EXTERNAL_EMOJIS'],

      aliases: ['t', 'tache'],
      usage: '<list|add|remove|edit|help:default> [key:string] [value:string] [...]',
      usageDelim: ' ',
      description: 'Affiche la liste des tâches',
      extendedHelp: 'Aucune aide complémentaire à afficher',

      cooldown: 5,
      subcommands: true
    })
    this.usageCustom = '%task'
    this.example = '%task'
  }

  // ================================================
  // == List all tasks || update tasklist channel
  // ================================================
  async list (message, [key]) {
    if (key && key === 'update') {
      return this.client.commands.get('tasklist').run(message, ['update'])
    } else {
      return this.client.commands.get('tasklist').run(message, ['show'])
    }
  }

  // ================================================
  // == Add a task
  // ================================================
  async add (message, [titre, dueDate, ...description]) {
    return this.client.commands.get('addtask').run(message, [titre, dueDate, description.join(' ')])
  }

  // ================================================
  // == Remove a task
  // ================================================
  async remove (message, [index]) {
    return this.client.commands.get('removetask').run(message, [index])
  }

  // ================================================
  // == Edit a task
  // ================================================
  async edit (message, [index, key, ...newValue]) {
    return this.client.commands.get('edittask').run(message, [index, key, newValue.join(' ')])
  }

  // ================================================
  // == Display task sub-commands
  // ================================================
  async help (message) {
    const prefix = message.guild.settings.prefix
    const embed = new MessageEmbed()
      .setColor(4886754)
      // help
      .addField(`${prefix}task help`, `Permet d'afficher ce message\n__Exemple :__ \`${prefix}task help\``)
      // list
      .addField(`${prefix}task list (update)`, `Permet d'afficher (ou de mettre à jour) la liste des tâches\n__Exemple :__ \`${prefix}task list\`\n__Exemple :__ \`${prefix}task list update\``)
      // add
      .addField(`${prefix}task add <titre> <date> <...description>`, `Permet d'ajouter une tâche à une date donnée\n__Exemple :__ \`${prefix}task add Maths 31/12/19 Faire l'exercice 69 page 420.\``)
      // edit
      .addField(`${prefix}task edit <numero> <titre|date|description> <nouvelleValeur>`, `Permet de modifier un champ d'une tâche déjà existante\n__Exemple :__ \`${prefix}task edit 1 titre Mathématiques.\``)
      // remove
      .addField(`${prefix}task remove <numero>`, `Permet de supprimer une tâche existante\n__Exemple :__ \`${prefix}task remove 1\``)
      .setTimestamp()
      .setFooter('Tâches', this.client.user.displayAvatarURL())
    message.send(embed)
  }
}
