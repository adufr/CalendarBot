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
      this.client.console.log('TasklistChannelUpdater has already been initialized.')
    }

  }

}