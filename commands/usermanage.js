const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
.setName("manage")
.setDescription("Manage user")
.addUserOption(option => option.setName("person").setDescription("The person to kick").setRequired(true));

module.exports.run = (bot, interaction, options) => {
    let permission = interaction.member.permissions;
    if (!permission.has("MANAGE_MESSAGES")) return interaction.editReply("You don't have the permission");
    
    let member = options.getMember("person");
    let embed = new MessageEmbed()
    .setTitle("Manage User: " + member.user.username)
    .setDescription("To manage the user click the buttons!")
    .setColor("AQUA");

    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Kick")
        .setStyle("DANGER")
        .setCustomId("kick-" + member.id)
    )

    return interaction.editReply({
        embeds: [embed],
        components: [row],
        ephemeral: true
    })
}