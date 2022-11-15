const { token, prefix } = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({intents: new discord.Intents(32767)});
/*const comregist = require('./slash-register')(false);
comregist();*/
require('./slash-register')(true)
let commands = require('./slash-register').commands;

client.on('ready', () => {
    console.log(client.user.tag + " elindult!")

})

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand) return;
    let name = interaction.commandName;
    let optins = interaction.optins;

    let commandMethod = commands.get(name);
    if(!commandMethod) return;
    await interaction.deferReply();
    commandMethod(client, interaction);
})


client.login(token);