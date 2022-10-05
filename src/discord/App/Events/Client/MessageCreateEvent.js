const {EmbedBuilder} = require("discord.js");
const CONFIG = require("../../../Config/app.json");

module.exports = {
    name: 'messageCreate',
    async execute(message, client){
        // let user = client.users.cache.get(message.author.id);
        //
        // let embed = new EmbedBuilder()
        //     .setColor('#2c2c2c')
        //     .setTitle('Mensagem enviada')
        //     .setDescription(`**Mensagem:** ${message.content}`)
        //     .setTimestamp()
        //     .setFooter({
        //         text: `Desenvolvido por ${CONFIG.author.name}`,
        //         iconURL: `${CONFIG.author.icon}`
        //     });
        //
        // user.send({
        //     embeds: [embed]
        // })
    }
}
