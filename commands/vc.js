const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
.setName("vc")
.setDescription("Manage Voice activiti")
.addUserOption(option => option.setName("vc_id").setDescription("The id of the voice channel").setRequired(true));

module.exports.run = (bot, interaction, options) => {
    let permission = interaction.member.permissions;
    if (!permission.has("MANAGE_MESSAGES")) return interaction.editReply("You don't have the permission");
    
    let vc = options.getString("vc_id");
    let embed = new MessageEmbed()
    .setTitle("Voice channel: " + vc.id)
    .setDescription("To manage the activity click the buttons!")
    .setColor("AQUA");

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Join")
        .setStyle("SUCCESS")
        .setCustomId("join-" + vc.id),

        new MessageButton()
        .setLabel("Leave")
        .setStyle("DANGER")
        .setCustomId("leave-" + vc.id)
    )

    return interaction.editReply({
        embeds: [embed],
        components: [row],
        ephemeral: true
    })
}