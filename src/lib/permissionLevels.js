const { PermissionLevels } = require('klasa')

module.exports = new PermissionLevels()
  // @everyone
  .add(0, () => true)
  // @add_tasks
  .add(1, ({ guild, member }) => guild.settings.roles.addtask && member.roles.find(r => r.id === guild.roles.find(role => role.id === guild.settings.roles.addtask).id))
  // admins
  .add(6, ({ guild, member }) => guild && (member.permissions.has('MANAGE_GUILD') || member.permissions.has('ADMINISTRATOR')), { fetch: true })
  // guild owner
  .add(7, ({ guild, member }) => guild && member === member.guild.owner, { fetch: true })
  // bot owner
  .add(9, ({ author, client }) => author === client.owner || author.id === '255065617705467912', { break: true })
  // bot owner silent (doesn't throw any error)
  .add(10, ({ author, client }) => author === client.owner || author.id === '255065617705467912')
