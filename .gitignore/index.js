const fs = require('fs');
const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');

const bot = new Client();
bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('ready', function() {
    bot.user.setActivity("Commande: /help");
    console.log(`Connecté avec succès en tant que ${bot.user.tag}`);
});

bot.login(TOKEN);

bot.on('message', message => {

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if(!bot.commands.has(command)) return;
    bot.commands.get(command).execute(message, args);

    // Salutation //
    if (message.content === "Salut" || message.content === "slt" || message.content === "yo" || message.content === "Bonjour" || message.content === "Yo" || message.content === "bjr"){
        message.reply("Bien le bonjour mon petit Muka's ! ^-^");
        console.log("Commande Salut effectuée");
    }

    // Affiche l'avatar de la personne //
    if (command === "avatar"){
        message.reply(`Connecté en tant que ${bot.user.tag}`);
    }

    // Affiche les infos du serveur //
    if (message.content.startsWith(`${PREFIX}serveur`)){
        message.channel.send(`Vous êtes sur le serveur ${message.guild.name}`);
    }

    //////////////////////////////////////// COMMANDE HELP ///////////////////////////////////
    if (message.content === prefix + "help"){
        var embed = new Discord.MessageEmbed()
            .setTitle("Commandes d'aide")
            .setDescription("Tu peux retrouver ci-dessous la liste des commandes principales de l'amiral Kizaru.")
            .addFields(
                { name: '/help', value: 'Permet d\'afficher la liste des commandes ', inline: true },
                { name: '/xp', value: 'Permet d\'afficher ton xp', inline: true },
                { name: 'Saluer', value: 'Le bot vous salue quand vous dites bonjour ! '}
            )
            .addField("Aide supplémentaire","Contacter un admin", true)
            .addField("Japanim", "Suivez moi sur [INSTAGRAM](https://www.instagram.com/japanim_dream/)", true)
            .setColor("#FF8000")
            .setFooter("Passez un bon moment parmis les muka's !")
        message.channel.send(embed);
    }

});
