const { Client, SlashCommandBuilder, GUILD_SLASH_COMMANDS, Collection, Events, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, IntentsBitField, REST, Routes, GUILD_EMOJIS_AND_STICKERS, ModalBuilder, TextInputStyle, TextInputBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const client = require('../bot.js')
const fs = require('fs');
const path = require('path');


const filePata = path.join(__dirname, './server.json');



function serv() {

    client.client.on("messageCreate", async (message) => {
        if (message.content !== '') {
            if (!message.guild) return;
            if (message.author.bot) return;

            fs.readFile(filePata, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Ошибка чтения файла server.js 20:63', err);
                    return;
                }

                let dator;
                try {
                    dator = JSON.parse(data);
                } catch (parseError) {
                    console.error('Ошибка парсинга JSON server.js 28:65', parseError);
                    return;
                }
                
                const chata = dator.chats.find(ide => ide.chat === message.channelId);

                if (chata) { // Межсерверный чат
                
                if(message.content.includes('http')) {
                
                message.reply(`You can't paste here links!`)
                
                return;
                } 
                
                    for (let i = 0; i < dator.chats.length; i++) {
                    
                    if (dator.chats[i].chat === message.channelId) continue;
                    
                    
                        let channel = client.client.channels.cache.get(dator.chats[i].chat);

                        let name = `${message.author.globalName} [${message.guild.name}]`;
                        let image = message.author.displayAvatarURL();

                        let webno = await channel.createWebhook({
                            name: name,
                            avatar: image
                        });

                        await webno.send({
                            content: message.content
                        });

                        setTimeout(() => {
                            webno.delete();
                        }, 2000);
                    }
                }
            });
        }
    });
    
    
    
    
    client.client.on("interactionCreate", async (inte) => {
    
    
    	if(inte.commandName == 'addserver') {
    	
     if (inte.guild.ownerId !== inte.user.id) {
            
          inte.reply({
            content: 'Error 404: you are not owner!',
            ephemeral: true
          })
          
          return;
          
          };
    	
           const idchat = inte.options.getString('chatid');
           const idguild = inte.guild.id;
           
           await inte.reply("Your server has added to list of chats");
           
           fs.readFile(filePata, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Ошибка чтения файла servers.js 85:72', err);
                    return;
                }

               let datora;
               try {
               datora = JSON.parse(data);
              } catch (parseError) {
              console.error('Ошибка парсинга JSON servers.js 93:67', parseError);
             return;
            }
            
         datora.chats.push({
           server: idguild,
           chat: idchat
        })  
            
            
             fs.writeFile(filePata, JSON.stringify(datora, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Ошибка записи файла servers.js 105:69', writeErr);
            }
        });            
            
                
          }); // FS read
           
           
           
    	}
    	
    	
    	
    	
    	
       if(inte.commandName == 'removeserver') {
    	
     if (inte.guild.ownerId !== inte.user.id) {
            
          inte.reply({
            content: 'Error 404: you are not owner!',
            ephemeral: true
          })
          
          return;
          
          };
    	
           const idchat = inte.options.getString('chatid');
           const idguild = inte.guild.id;
           
           await inte.reply("Your server has removed from list of chats");
           
           fs.readFile(filePata, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Ошибка чтения файла servers.js 85:72', err);
                    return;
                }

               let datora;
               try {
               datora = JSON.parse(data);
              } catch (parseError) {
              console.error('Ошибка парсинга JSON servers.js 160:68', parseError);
             return;
            }
            
          datora.chats = datora.chats.filter(chat => !(chat.server === idguild && chat.chat === idchat));
            
            
             fs.writeFile(filePata, JSON.stringify(datora, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Ошибка удаления строчки из файла servers.js 169:82', writeErr);
            }
        });            
            
                
          }); // FS read
           
           
           
    	}	
    	
    	
    	
    	
    	
    	
    		
    })
}


module.exports.serv = serv;
