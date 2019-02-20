const { Argument } = require('klasa')
const moment = require('moment')

module.exports = class extends Argument {
  run (arg, possible, msg) {
    // formate the date
    const date = moment(arg, 'DD/MM/YY').toDate()
    // if date is in the right format
    // if date is in the future
    // if date isn't in more than 2 years
    if (date
      && !isNaN(date.getTime())
      && date.getTime() > Date.now()
      && date.getTime() < new Date(new Date().setFullYear(new Date().getFullYear() + 2)).getTime())
      return date
    else throw msg.reply(`la date indiquée n'est pas valide !`)
  }
}
