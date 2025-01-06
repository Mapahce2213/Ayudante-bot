const { Client, SlashCommandBuilder, GUILD_SLASH_COMMANDS, Collection, Events, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, IntentsBitField, REST, Routes, GUILD_EMOJIS_AND_STICKERS, ModalBuilder, TextInputStyle, TextInputBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, WebhookClient, MessageEmbed } = require('discord.js');
const client = require('../bot.js')
const fs = require('fs');
const path = require('path');


const filePata = path.join(__dirname, './server.json');



function serv() {

    client.client.on("messageCreate", async (message) => {
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
                
                if(message.content.includes('youtube') || message.content.includes('discord.gg')) {
                message.reply(`You can't paste here links!`)
                return;
                } 
                
                    for (let i = 0; i < dator.chats.length; i++) {
                    
                    if (dator.chats[i].chat === message.channelId) continue;
                    
                    
                        let channel = client.client.channels.cache.get(dator.chats[i].chat);

                        let name = `${message.author.globalName} [${message.guild.name}]`;
                        let image = message.author.displayAvatarURL();
                        let webro = new WebhookClient({ url: dator.chats[i].webno})
                        
                        

     try {                       
                 setTimeout(() => {
                        
                         webro.edit({
                         name: name,
                         avatar: image
                        });
                 }, 750);
                      
                      
let attachments = message.attachments.map(attachment => attachment.url); 

if (attachments.length > 2) {
    message.reply("You can't only send up to 2 attachments!");
    return;
}
                      
             if(message.reference) {
             let refera = await message.channel.messages.fetch(message.reference.messageId);
             
             if(refera) {
             
             const replya = new EmbedBuilder()
				.setColor(0xffff03)
				.setAuthor({ name: refera.author.username, iconURL: refera.author.displayAvatarURL() })
				.setDescription(refera.content)
             
             
             
           setTimeout(() => {
           webro.send({
           content: message.content,
           embeds: [replya],
           files: attachments
          });
           }, 1000);
                            
                            }                        
                                     
             } else {         
                      
                    setTimeout(() => {
                        webro.send({ 
                        content: message.content,
                        files: attachments
                        })
                      }, 1000);
             
             }
      } catch(erra) {
            if (erra.code === 10015) {
            
            dator.chats = dator.chats.filter(chat => !(chat.server === idguild && chat.chat === idchat && chat.webno === dator.chats[i].webno));
            
            } else {
            console.error(`Error fetching webhook: ${error}`);
            }
      
      }                  
                        
                    }
                }
            });

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
            
       
       
       let channel = client.client.channels.cache.get(idchat);
       
        let webno = await channel.createWebhook({
                            name: "Global chat Ayudante"
                        });
            
            
            
         datora.chats.push({
           webno: webno.url,
           server: idguild,
           chat: idchat,
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
            
                                for (let i = 0; i < datora.chats.length; i++) {
                    
                    if (datora.chats[i].chat === inte.channelId) continue;
                    
                    
                        let channel = client.client.channels.cache.get(datora.chats[i].chat);

                        let webro = new WebhookClient({ url: datora.chats[i].webno})
                        
                         await webro.delete();
                        }
                        
                        
                        
          datora.chats = datora.chats.filter(chat => !(chat.server === idguild && chat.chat === idchat && chat.webno));

            
            
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
