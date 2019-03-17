const { Event } = require('klasa')
const config = require('../lib/config')
module.exports = class extends Event {
  constructor (...args) {
    super(...args, {
      name: 'cronTasksInitializer',
      enabled: true,
      event: 'klasaReady',
      once: false
    })
  }

  run () {
    // initialize the TasklistChannelUpdater task
    if (!this.client.schedule.tasks.some(task => task.taskName === 'tasklistChannelUpdater')) {
      if (config.node_env === 'production') {
        this.client.schedule.create('tasklistChannelUpdater', '0 0 * * *')
      } else {
        this.client.schedule.create('tasklistChannelUpdater', '* * * * *')
      }
      this.client.console.log('TasklistChannelUpdater has successfuly been initialized.')
    } else {
      this.client.console.log('TasklistChannelUpdater already initialized.')
    }

    // initialize the Notifier task
    if (!this.client.schedule.tasks.some(task => task.taskName === 'notifier')) {
      if (config.node_env === 'production') {
        this.client.schedule.create('notifier', '30 18 * * *')
      } else {
        this.client.schedule.create('notifier', '* * * * *')
      }
      this.client.console.log('Notifier has successfuly been initialized.')
    } else {
      this.client.console.log('Notifier already initialized.')
    }
  }
}
