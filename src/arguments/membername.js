const { Argument, util: { regExpEsc } } = require('klasa')
const { GuildMember, User } = require('discord.js')

const USER_REGEXP = Argument.regex.userOrMember

module.exports = class extends Argument {
  async run (arg, possible, msg) {
    if (!msg.guild) throw `Cette commande ne peut uniquement être utilisée sur un serveur.`

    // if:
    // member is found
    const resUser = await resolveMember(arg, msg.guild)
    if (resUser) return resUser

    // else:
    // there are many of them ||
    // it doesn't exist
    const results = []

    // Searching accross all members
    const reg = new RegExp(regExpEsc(arg), 'i')
    for (const member of msg.guild.members.values()) {
      if (reg.test(member.user.username)) results.push(member)
      if (member.nickname && reg.test(member.nickname)) results.push(member)
    }

    let querySearch
    if (results.length > 0) {
      const regWord = new RegExp(`\\b${regExpEsc(arg)}\\b`, 'i')
      const filtered = results.filter(member =>
        regWord.test(member.user.username) ||
        (member.nickname && regWord.test(member.nickname))
      )
      querySearch = filtered.length > 0 ? filtered : results
    } else {
      querySearch = results
    }

    switch (querySearch.length) {
      case 0:
        throw msg.reply(`je n'ai pas trouvé de membre avec ce nom...\n(Veuillez indiquer un nom valide, un ID, ou une @mention)`)
      case 1:
        return querySearch[0]
      default:
        throw msg.reply(`j'ai trouvé plusieurs correspondances :\n\`${querySearch.map(member => member.user.tag).join('`, `')}\``)
    }
  }
}

// Return user if it exists
// else return null
function resolveMember (query, guild) {
  if (query instanceof GuildMember) return query
  if (query instanceof User) return guild.members.fetch(query)
  if (typeof query === 'string') {
    if (USER_REGEXP.test(query)) {
      return guild.members.fetch(USER_REGEXP.exec(query)[1]).catch(() => null)
    }
    if (/\w{1,32}#\d{4}/.test(query)) {
      const res = guild.members.find(member => member.user.tag.toLowerCase() === query.toLowerCase())
      return res || null
    }
  }
  return null
}
