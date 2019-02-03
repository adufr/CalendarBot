const { Argument } = require('klasa')
const moment = require('moment')

module.exports = class extends Argument {
  run (arg, possible, msg) {
    // formate the date
    const date = moment(arg, 'DD/MM/YY').toDate()
    // if date is in the right format
    // if date is in the future
    if (date && !isNaN(date.getTime()) && date.getTime() > Date.now()) return date
    else throw msg.reply(`<@${msg.author.id}>, la date indiquée n'est pas valide !`)
  }
}
