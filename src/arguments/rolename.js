const { Argument, util: { regExpEsc } } = require('klasa')
const { Role } = require('discord.js')

const ROLE_REGEXP = Argument.regex.role

module.exports = class extends Argument {
  async run (arg, possible, msg) {
    if (!msg.guild) return this.role(arg, possible, msg)

    // if:
    // role is found
    const resRole = resolveRole(arg, msg.guild)
    if (resRole) return resRole

    // else:
    // there are many of them ||
    // it doesn't exist
    const results = []

    // Searching accross all roles
    const reg = new RegExp(regExpEsc(arg), 'i')
    for (const role of msg.guild.roles.values()) {
      if (reg.test(role.name)) results.push(role)
    }

    let querySearch
    if (results.length > 0) {
      const regWord = new RegExp(`\\b${regExpEsc(arg)}\\b`, 'i')
      const filtered = results.filter(role => regWord.test(role.name))
      querySearch = filtered.length > 0 ? filtered : results
    } else {
      querySearch = results
    }

    switch (querySearch.length) {
      case 0:
        throw msg.reply(`je n'ai pas trouvé de rôle avec ce nom...\n(Veuillez indiquer un nom valide, un ID, ou une @mention)`)
      case 1:
        return querySearch[0]
      default:
        throw msg.reply(`j'ai trouvé plusieurs correspondances :\n\`${querySearch.map(role => role.name).join('`, `')}\``)
    }
  }
}

// Return role if it exists
// else return null
function resolveRole (query, guild) {
  if (query instanceof Role) return guild.roles.has(query.id) ? query : null
  if (typeof query === 'string' && ROLE_REGEXP.test(query)) return guild.roles.get(ROLE_REGEXP.exec(query)[1])
  return null
}
