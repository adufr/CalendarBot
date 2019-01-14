const moment = require('moment')

module.exports = {
  // Manages text alignement
  // (adds some dots (".") depending of the size of
  // the string passed as a parameter)
  beautify (string, size) {
    if (string.length < size) {
      for (let i = 0; i < size; i++) {
        if (string.length < size) string += '.'
      }
    }
    return string
  },
  // Sorts dates
  sortDueDates (a, b) {
    return moment(a.due_date, 'DD-MM-YY') - moment(b.due_date, 'DD-MM-YY')
  }
}
