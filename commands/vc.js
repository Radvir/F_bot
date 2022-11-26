const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, VoiceChannel, BaseGuildVoiceChannel } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
.setName("vc")
.setDescription("Manage Voice activiti")
/*.addChannelOption(option => {
    option.setName('channel')
    .setDescription('The channel to join into')
    .addChannelTypes(VoiceChannel)
})
.toJSON()*/;

module.exports.run = (bot, interaction, options) => {
    let permission = interaction.member.permissions;
    if (!permission.has("MANAGE_MESSAGES")) return interaction.editReply("You don't have the permission");
    
    let vc = options.getString("vc_id");
    let embed = new MessageEmbed()
    .setTitle("Voice channel: ")
    .setDescription("To manage the activity click the buttons!")
    .setColor("AQUA");

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Join")
        .setStyle("SUCCESS")
        .setCustomId("join-"),

        new MessageButton()
        .setLabel("Leave")
        .setStyle("PRIMARY")
        .setCustomId("leave-"),

        new MessageButton()
        .setLabel("Disconnect")
        .setStyle("DANGER")
        .setCustomId("disconnect-")
    )

    return interaction.editReply({
        ephemeral: true,
        embeds: [embed],
        components: [row],
        
    })
}