const { token } = require('./config.json');
const discord = require('discord.js');
require('ffmpeg');
const voiceDiscord = require('@discordjs/voice');
const { messageLink, time } = require('@discordjs/builders');
const client = new discord.Client({intents: new discord.Intents(32767)});
require('./slash-register')(true)
let commands = require('./slash-register').commands;

let connection;
let guildId = "1031959691330338897";
const voiceChannel = "1031959691330338902";
let player = voiceDiscord.createAudioPlayer();
let filetoplay = './ki.mp3';



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

        

        if(command == "kick"){
            member.kick();
            return interaction.editReply({
                content: "Successfully kicked " + member.user.username,
                ephemeral: true
            })
        } else if (command == "join"){
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
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            })
            
            

            await sleep(1000);
            if(!runtimeBe){
                filetoplay = './be.mp3';
                let resource = voiceDiscord.createAudioResource(filetoplay);
                player.play(resource);
                connection.subscribe(player)

                player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                    console.log(filetoplay + " ended")
                    //connection.destroy();
                }) 
                interaction.editReply({
                    content: "Successfully played becsöngő",
                    ephemeral: true
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
                    ephemeral: true
                })
            }
            interaction.editReply({
                content: "Successfully joined vc",
                ephemeral: true
            })
        }else if(command == "disconnect"){
            let dc_guild = new discord.Guild(client, {
                id: guildId,
            })
            let vc_channel = new discord.VoiceChannel(dc_guild, {
                id: voiceChannel,
            });
            //interaction.member.voice.disconnect("mert");
            //console.log(vc_channel.name);
            let vc_members = vc_channel.members;
            console.log(vc_members);
            for(let i = 0; i < vc_members.length; i++){
                if(vc_members[i].isConnected())
                vc_members[i].member.disconnect("mer");

                interaction.editReply({
                    content: "Successfully disconnected: " + vc_members[i].displayName,
                })
            }

            
        } else if(command == "leave"){
            if(connection != null){
                connection.destroy();
                return interaction.editReply({
                    content: "Successfully left voice channel",
                    ephemeral: true
                })
            } else {
                return interaction.editReply({
                    content: "Bot isn't in voice channel",
                    ephemeral: false
                })
            }
        } 
    }
})


client.login(token);