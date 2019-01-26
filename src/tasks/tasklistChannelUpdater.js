const { Task } = require('klasa');

module.exports = class extends Task {

  constructor(...args) {
    super(...args, { name: 'tasklistChannelUpdater', enabled: true });
  }

  // Updates the tasklist channel for each guild
  // that has already configured it.
  async run() {
    this.client.guilds.forEach(guild => {
      // if there is a configuredchannel
      const channelId = guild.settings.channels.tasklist
      if (!channelId) return
      
      // if the channel is valid
      const channel = guild.channels.find(channel => channel.id === channelId)
      if (!channel) return
      
      // if bot's last msg is already a tasklist: delete & post new one
      // otherwise, do nothing but posting the new one
      const lastMessage = channel.messages.last()
      if (lastMessage && lastMessage.author.id === this.client.user.id) {
        lastMessage.delete()
      } 

      this.client.console.log(`Updated tasklist channel of ${channel.guild.name} (${channel.guild.id})!`)
      
      // Calls the Tasklist Embed builder
      const embed = this.client.funcs.getTasklistEmbed(this.client, channel)
      if (embed) channel.send(embed)
    })
  }

}
