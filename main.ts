import { token, bell } from './config.json'
const discord = require('discord.js');
import 'ffmpeg'
import * as voiceDiscord from '@discordjs/voice'
import { messageLink, time } from '@discordjs/builders';
const client = new discord.Client({intents: new discord.Intents(32767)});
require('./slash-register')(false)
let commands = require('./slash-register').commands;
import * as cron from 'node-cron';

let connection;
let guildId = "1031959691330338897";
const voiceChannel = "1031959691330338902";
let player = voiceDiscord.createAudioPlayer();
let filetoplay: string;


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function BellPlay(mode){
    connection = voiceDiscord.joinVoiceChannel({
        channelId: voiceChannel,
        guildId: guildId,
        adapterCreator: client.channels.cache.get(voiceChannel).guild.voiceAdapterCreator,
    })
    
    if(mode == "be"){
        filetoplay = './be.mp3';
        let resource = voiceDiscord.createAudioResource(filetoplay);
        player.play(resource);
        connection.subscribe(player)

        player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            console.log(filetoplay + " ended")
            connection.destroy();
        })
    } else if(mode == "ki"){
        filetoplay = './ki.mp3';
        let resource = voiceDiscord.createAudioResource(filetoplay);
        player.play(resource);
        connection.subscribe(player)

        player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            console.log(filetoplay + " ended")
            connection.destroy();
        })
    }
}


client.on('ready', () => {
    console.log(client.user.tag + " elindult!");

    for (let i = 0; i < bell.be.length; i++) {
        const temp = bell.be[i];
        cron.schedule(`${temp.m} ${temp.h} * * * `, () => {
            BellPlay("be")
        })
    }
    for (let j = 0; j < bell.ki.length; j++) {
        const temp = bell.ki[j];
        cron.schedule(`${temp.m} ${temp.h} * * * `, () => {
            BellPlay("ki")
        })
    }
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

        if(command == "disconnect"){
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