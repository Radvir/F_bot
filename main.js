const { token } = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({intents: new discord.Intents(32767)});
require('./slash-register')(true)
let commands = require('./slash-register').commands;

client.on('ready', () => {
    console.log(client.user.tag + " elindult!")

})

client.on('interactionCreate', async interaction => {
    await interaction.deferReply();
    if(interaction.isCommand()){
        let name = interaction.commandName;
        let options = interaction.options;

        let commandMethod = commands.get(name);
        if(!commandMethod) return;
        
        commandMethod(client, interaction, options);
    }else if(interaction.isButton()){
        let button_id = interaction.customId;
        let [command, id] = button_id.split("-");
        let guild = interaction.guild;
        let member = guild.members.cache.get(id);

        if(command == "kick"){
            member.kick();
            return interaction.editReply({
                content: "Successfully kicked " + member.user.username,
                ephemeral: true
            })
        }
    }
})


client.login(token);