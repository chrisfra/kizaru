const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: [] }).write();

var prefix = ("/");

bot.on('ready', function() {
    bot.user.setActivity("Command: /help");
    console.log("Connected");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {

    //////////////////////////////////////// Salutation //////////////////////////
    if (message.content === "Salut" || message.content === "slt" || message.content === "yo" || message.content === "Bonjour"){
        message.reply("Bien le bonjour mon petit Muka's ! ^-^");
        console.log("Commande Salut effectuée");
        message.send(`Connecté en tant que ${client.user.avatar}`);
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

    //////////////////////////////////////// COMMANDE XP /////////////////////////////////////
    
    //Incrémentation de l'xp
    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb);
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1 }).write();

    //Commande pour l'xp
        if (message.content === prefix + "xp"){
            
            let mentionedUser = message.mentions.users.first() || message.author;
            var xp = db.get("xp").filter({user: msgauthor}).find("xp").value();
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.MessageEmbed()
                .setTitle(`XP de ${message.author.username}`)
                .setColor('#FF8000')
                .setImage(mentionedUser.displayAvatarURL)
                .setDescription("Affichage de l'xp")
                .addField("XP: ", `Tu as ${xpfinal[1]} xp`);

            message.channel.send({embed: xp_embed});
        }
    }

});
