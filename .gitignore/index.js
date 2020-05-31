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

//bot.login("NzE2NDQzODcwMDYxMjY0OTE3.XtMDWw.byaNy9kvMY2JOmV5Y_FhNNebH4Q");
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
            .addField("Aide supplémentaire","Contacter un admin", true)
            .addField("Japanim", "Suivez moi sur [INSTAGRAM](https://www.instagram.com/japanim_dream/)", true)
            .setColor("0xFF8000")
            .setFooter("Passez un bon moment parmis les muka's !")
        message.channel.send(embed);
    }

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

        if (message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find("xp").value();
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.MessageEmbed()
                .setTitle(`XP de ${message.author.username}`)
                .setColor('#F4D03F')
                .setDescription("Affichage de l'xp")
                .addField("XP: ", `${xpfinal[1]} xp`)
            message.channel.send({embed: xp_embed});
        }
    }

});
