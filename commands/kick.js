const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.data = new SlashCommandBuilder()
.setName("kick")
.setDescription("Kick the user provided")
.addUserOption(option => option.setName("person").setDescription("The person to kick").setRequired(true))
.addStringOption(option => option.setName("reason").setDescription("Why this is haappening?").setRequired(false));

module.exports.run = (bot, interaction, options) => {
    let permission = interaction.member.permissions;
    if (!permission.has("MANAGE_MESSAGES")) return interaction.editReply("You don't have the permission");
    
    let reason = null;
    let member = options.getMember("person");
    if(optins.getString("reason") != null){
        reason = optins.getString("reason");
    }

    member.kick(member ).then( () => {
        interaction.editReply({content: `${member.displayName} got kicked for ${reason}`})
    }).catch(error => {
        console.log("Hello there " + error);
    })
}