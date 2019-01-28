const { Event } = require('klasa');

module.exports = class extends Event {

  constructor(...args) {
    super(...args, {
      name: 'cronTasksInitializer',
      enabled: true,
      event: 'klasaReady',
      once: false
    })
  }

  run() {
    
    // initialize the TasklistChannelUpdater task
    if (!this.client.schedule.tasks.some(task => task.taskName === 'tasklistChannelUpdater')) {
      this.client.schedule.create('tasklistChannelUpdater', '0 0 * * *')
      this.client.console.log('TasklistChannelUpdater has successfuly been initialized.')
    } else {
      this.client.console.log('TasklistChannelUpdater already initialized.')
    }

    // initialize the Notifier task
    if (!this.client.schedule.tasks.some(task => task.taskName === 'notifier')) {
      this.client.schedule.create('notifier', '0 18 * * *')
      this.client.console.log('Notifier has successfuly been initialized.')
    } else {
      this.client.console.log('Notifier already initialized.')
    }

  }

}