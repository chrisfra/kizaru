module.exports = {
    name: 'help',
    description: 'Renvoie toutes les commandes du bot.',
    execute(message, args){
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
}