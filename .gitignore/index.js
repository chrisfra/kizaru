const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("/");

bot.on('ready', function() {
    bot.user.setActivity("Command: /help");
    console.log("Connected");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {

    if (message.content === "Salut"){
        message.reply("Bien le bonjour mon petit Muka's ! ^-^");
        console.log("Commande Salut effectuée");
    }

    if (message.content === prefix + "help"){
        var embed = new Discord.MessageEmbed()
            .setTitle("Commandes d'aide")
            .setDescription("Tu peux retrouver ci-dessous la liste des commandes principales de l'amiral Kizaru.")
            .addFields(
                { name: '/help', value: 'Permet d\'afficher la liste des commandes ', inline: true },
                { name: 'Saluer', value: 'Le bot vous salue quand vous dites bonjour ! '}
            )
            .addField(".help","Page d'aide", true)
            .addField("Embed01", "Embed 01 ! ;) Suivez moi sur [INSTAGRAM](https://www.instagram.com/japanim_dream/)", true)
            .setColor("0xFF8000")
            .setFooter("Bon moment parmis les muka's !")
        message.channel.send(embed);
    }

});
