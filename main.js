const { token, prefix } = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({intents: new discord.Intents(32767)});
require('./slash-register')();

client.on('ready', () => {
    console.log(client.user.tag + " elindult!")

    let commands = client.application.commands;
    commands.create({
        name : "hello",
        description: "welcoming message"
    });
})

client.on('interactionCreate', interaction => {
    if(!interaction.isCommand) return;
    let name = interaction.commandName;
    let optins = interaction.optins;

    if (name == "hello"){
        interaction.reply({
            content: "hello",
            ephemeral: true
        })
    }
})


client.login(token);