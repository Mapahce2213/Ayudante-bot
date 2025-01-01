const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const { Client, SlashCommandBuilder, GUILD_SLASH_COMMANDS, Collection, Events, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, IntentsBitField, REST, Routes, Partials, Message, Guild, ActivityType, GUILD_EMOJIS_AND_STICKERS, MANAGE_WEBHOOKS, Webhook, WebhookClient, GUILD_MEMBERS, VIEW_MEMBERS } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, StreamType, VoiceConnectionStatus, EndBehaviorType, getVoiceConnection } = require('@discordjs/voice');
const { Readable } = require('stream');
const { spawn } = require('child_process');

const { clientId, guildId, token } = require('./config.json');
const { channel } = require('node:diagnostics_channel');


const client = new Client({ partials: [Partials.Channel, Partials.Message, Partials.GuildMember], intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages ]});

module.exports.client = client;
	
	
	const mjserv = require('./plushki/servers.js');
	
	mjserv.serv();
	

client.on("ready", function() {


 const coount = client.guilds.cache.size;
client.user.setActivity(`${coount} servidores online`, { type: ActivityType.Playing });

});
client.on("guildCreate", guilda => {

     const coount = client.guilds.cache.size;
client.user.setActivity(`${coount} servidores online`, { type: ActivityType.Playing });
    
	  console.log("Меня добавили на сервер")
})


client.login(token);
