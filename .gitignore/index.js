const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("/");

bot.on('ready', function() {
    bot.user.setActivity("Command: /help");
    console.log("Connected");
});

bot.login("NzE2NDQzODcwMDYxMjY0OTE3.XtL4IQ.xFguLKhwnwOfBk1hOLEHDAX6Mmc");

bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.send("Liste des commandes : \n - /help");
    }

    if (message.content === "Salut"){
        message.reply("Bien le bonjour mon petit Muka's ! ^-^");
        console.log("Commande Salut effectuée");
    }
});
