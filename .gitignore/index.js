const fs = require('fs');
const { Client, Collection} = require('discord.js');
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

    const args = message.content.slice(PREFIX.length).split(/ +/);
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
});
