# Ayudante-bot
That is OpenSource of my bot

## File Servers.js

### What include? And how to work that?

It's a multi-server chat room. A person sends a message to one channel ( and new webhooks are created behind the scenes ). 

![How it's works](https://i.imgur.com/i7dnSIv.png)

### It may seem wild to a lot of people since I am importing a client.

```js

const client = require('../bot.js')

client.client.on("messageCreate", async (message) => {

})
```

That is my idea only!

I use **discord.js** and **Node.js** as they are convenient and clear for programming 


### The **FS** write method is used here to edit and read the JSON file

```js
fs.readFile(filePata, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Ошибка чтения файла server.js 20:63', err);
                    return;
                }

                let dator;
                try {
                    dator = JSON.parse(data);
                } catch (parseError) {
                    console.error('Ошибка парсинга JSON server.js 28:65', parseError); // Error of parsing
                    return;
                }
                
                const chata = dator.chats.find(ide => ide.chat === message.channelId); // Find the ID of chat
```

I use a handy database that includes a list of channels and servers to which messages are sent. I like to use **JSON**!

```json
{
  "chats": [
    {
      "server": "1096063929043669104",
      "chat": "1324061868234637332"
    },
    {
      "server": "1089497578141388920",
      "chat": "1324067748392730655"
    }
  ]
}
```

### No permit links and raids in chats

I did this to avoid raids on discord servers and to keep my app secure!

```js
                if(message.content.includes('http')) {
                
                message.reply(`You can't paste here links!`)
                
                return;
                }

```

