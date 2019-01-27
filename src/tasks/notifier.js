const { Task } = require('klasa');

module.exports = class extends Task {

  constructor(...args) {
    super(...args, { name: 'notifier', enabled: true });
  }

  // Checks for each guild if it has tasks due for
  // "tomorrow", if yes, sends a notification
  // to the appropriate channel.
  async run() {
    this.client.guilds.forEach(guild => {
      // if there is a configuredchannel
      const channelId = guild.settings.channels.notifications
      if (!channelId) return
      
      // gets tasks for tomorrow
      const embed = this.client.funcs.getNotificationEmbed(this.client, message)
      if (!embed) return

      // if the channel is valid
      const channel = guild.channels.find(channel => channel.id === channelId)
      if (!channel) return
      
      // if bot's last msg is already a notification: delete & post new one
      // otherwise, do nothing but posting the new one
      const lastMessage = channel.messages.last()
      if (lastMessage && lastMessage.author.id === this.client.user.id) {
        lastMessage.delete()
      } 

      channel.send(embed)
      this.client.console.log(`Sent a notification for guild ${channel.guild.name} (${channel.guild.id})!`)
    })
  }

}
