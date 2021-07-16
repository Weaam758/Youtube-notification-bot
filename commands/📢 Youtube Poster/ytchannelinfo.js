const { Client, Message, MessageEmbed } = require('discord.js');
const { prefix, config } = require('../..');

module.exports = {
    name: 'ytchannelinfo',
    aliases: ['ytchinfo'],
    categories: 'yt_poster',
    description: 'Get detailed YT-Channel-Data by a CHANNELLINK',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        let ChannelLink = args[0];
        if (!ChannelLink) return message.channel.send(`:x: Usage: \`${prefix}channelinfo <LINK>\``)

        //get Channel Information
        client.YTP.getChannelInfo(ChannelLink).then(Channel => {
            let embed = new MessageEmbed()
                .setTitle(Channel.name)
                .setURL(Channel.url)
                .setColor("RED")
                .addField("**Subscribercount:**", "`" + Channel.subscribers + "`")
                .addField("**Tags:**", Channel.tags.map(t => `\`${t}\``).join(",  "))
                .addField("**Unlisted:**", Channel.unlisted ? "✅" : "❌", true)
                .addField("**FamilySafe:**", Channel.familySafe ? "✅" : "❌", true)
                .setFooter("ID: " + Channel.id)
                .setImage(Channel.mobileBanner[0]?.url)
                .setDescription(String(Channel.description).substr(0, 1500))
                .setAuthor(message.author.tag)
                .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
                .setFooter(config.footertext)
            //Send the Message
            message.channel.send({
                embed: embed
            }).then(msg => msg.react("👍"))
        }).catch(e => {
            console.log(e);
            message.channel.send(`${e.message ? e.message : e}`, {
                code: "js"
            })
        })

    }
}