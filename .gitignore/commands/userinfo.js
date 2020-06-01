module.exports = {
    name: 'userinfo',
    description: 'Renvoie les informations d\'un utilisateur mentionné.',
    execute(message, args){
        console.log("CA MARCHE PAAAAS");
        const user_mention = message.mentions.users.first();
        if(!user_mention){
            message.channel.send(`Voici les infos de ${message.author}`)
        }else{
            message.channel.send(`Voici les infos de ${user_mention.username}`);
        }
    }
}
