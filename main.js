const { token } = require('./config.json');
const discord = require('discord.js');
require('ffmpeg');
const voiceDiscord = require('@discordjs/voice');
const { messageLink, time } = require('@discordjs/builders');
const client = new discord.Client({intents: new discord.Intents(32767)});
require('./slash-register')(false);
let commands = require('./slash-register').commands;

let connection;
const voiceChannel = "754237349180997644";
const guildId = "688422208518750237";
let player = voiceDiscord.createAudioPlayer();
let filetoplay;


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

client.on('ready', () => {
    console.log(client.user.tag + " elindult!");
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

        

        if (command == "join"){
            let d = new Date();
            let runtimeBe = ((d.getHours() == 7 && d.getMinutes() == 30) || 
            (d.getHours() == 8 && d.getMinutes() == 25) || 
            (d.getHours() == 9 && d.getMinutes() == 20) || 
            (d.getHours() == 10 && d.getMinutes() == 20) || 
            (d.getHours() == 11 && d.getMinutes() == 15) || 
            (d.getHours() == 12 && d.getMinutes() == 20) || 
            (d.getHours() == 13 && d.getMinutes() == 25) || 
            (d.getHours() == 14 && d.getMinutes() == 30));

            let runtimeKi = ( 
            (d.getHours() == 8 && d.getMinutes() == 15) || 
            (d.getHours() == 9 && d.getMinutes() == 10) || 
            (d.getHours() == 10 && d.getMinutes() == 5) || 
            (d.getHours() == 11 && d.getMinutes() == 5) || 
            (d.getHours() == 12 && d.getMinutes() == 0) || 
            (d.getHours() == 13 && d.getMinutes() == 5) || 
            (d.getHours() == 14 && d.getMinutes() == 10));

            connection = voiceDiscord.joinVoiceChannel({
                channelId: voiceChannel,
                guildId: guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            })


            await sleep(1000);
            if(runtimeBe){
                filetoplay = './be.mp3';
                let resource = voiceDiscord.createAudioResource(filetoplay);
                player.play(resource);
                connection.subscribe(player)

                player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                    console.log(filetoplay + " ended")
                }) 
                interaction.editReply({
                    content: "Successfully played becsöngő",
                })
            } else if(runtimeKi){
                filetoplay = './ki.mp3';
                let resource = voiceDiscord.createAudioResource(filetoplay);
                player.play(resource);
                connection.subscribe(player)

                player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                    console.log(filetoplay + " ended")
                    //connection.destroy();
                }) 
                interaction.editReply({
                    content: "Successfully played kicsöngő",
                })
            }
            interaction.editReply({
                content: "Successfully joined vc",
            })
        }else if(command == "leave"){
            if(connection != null){
                connection.destroy();
                return interaction.editReply({
                    content: "Successfully left voice channel",
                })
            } else {
                return interaction.editReply({
                    content: "Bot isn't in voice channel",
                })
            }
        } 
    }
})


client.login(token);