# Ayudante-bot
That is OpenSource of my bot

## File Servers.js

### What include? And how to work that?

It's a multi-server chat room. A person sends a message to one channel ( and new webhooks are created behind the scenes ). 

![How it's works](https://i.imgur.com/i7dnSIv.png)

It may seem wild to a lot of people since I am importing a client.

```js

const client = require('../bot.js')

client.client.on("messageCreate", async (message) => {

})
```

That is my idea only

I use **discord.js** and **Node.js** as they are convenient and clear for programming 
