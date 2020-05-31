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

/*
let command = message.content.split(" ")[0];
const args = message.content.slice(prefix.length).split(/ +/);
command = args.shift().toLowerCase();*/

bot.on('message', message => {

    //////////////////////////////////////// Salutation //////////////////////////
    if (message.content === "Salut" || message.content === "slt" || message.content === "yo" || message.content === "Bonjour"){
        message.reply("Bien le bonjour mon petit Muka's ! ^-^");
        console.log("Commande Salut effectuée");
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

    /////////////////////////////////////// COMMANDE AVATAR ///////////////////////////
    if (message.content === prefix + 'avatar') {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new Discord.RichEmbed()
            .setColor(0x333333)
            .setAuthor(user.username)
            .setImage(user.avatarURL);
        message.channel.send(avatarEmbed);
    }

    ////////////////////////////////////// COMMANDES KICK ET BAN /////////////////////
/*
    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Kizaru")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande, maudit pirate !").catch(console.error); 
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner le pirate à kicker, amiral !");
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickmember){
            return message.reply("Ce pirate est introuvable ou impossible à expulser.");
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply("Amiral, je n'ai pas votre permission de kicker des pirates, veuillez me l'accorder.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé de l'île avec succès`).catch(console.error);
            message.guild.channels.find("name", "logs-kizaru").send(`**${member.user.username}** a été expulsé du discord par **${message.author.username}**`);
        });
    }

    if (command === "ban"){
        let modRole = message.guild.roles.find("name", "Kizaru");
        if(!message.member.roles.has(modRole.id)){
            return message.reply("Tu n'as pas la permission de faire cette commande.");
        }
        const member = message.mentions.first();
        if (!member) return message.reply("Merci de mentionner le pirate à bannir");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni avec succès.`);
            message.guild.channels.find("name", "logs-kizaru").send(`**${member.user.username}** a été banni par **${message.author.username}**`);
        });
    }*/
});
