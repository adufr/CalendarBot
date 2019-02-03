const { PermissionLevels } = require('klasa')

module.exports = new PermissionLevels()
  // @everyone
  .add(0, () => true)
  // admins
  .add(6, ({ author, client }) => author.guild && (author.permissions.has('MANAGE_GUILD') || author.permissions.has('ADMINISTRATOR')), { fetch: true })
  // guild owner
  .add(7, ({ author, client }) => author.guild && author.member === author.guild.owner, { fetch: true })
  // bot owner
  .add(9, ({ author, client }) => author === client.owner || author.id === '255065617705467912', { break: true })
  // bot owner silent (doesn't throw any error)
  .add(10, ({ author, client }) => author === client.owner || author.id === '255065617705467912')
