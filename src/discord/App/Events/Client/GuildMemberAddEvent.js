const {GuildMember, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');
const CONFIG = require("../../../Config/app.json");
const {ButtonStyle} = require("discord-api-types/v8");

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        // const user = client.users.cache.get(member.id);
        // const verify_channel = member.guild.channels.cache.get('1024795467927785482');
        // const verify_embed = new EmbedBuilder()
        //     .setColor('#2c2c2c')
        //     .setTitle('Bem-vindo ao servidor!')
        //     .setDescription('Para ter acesso ao servidor, você precisa verificar sua conta. Para isso basta clicar no botão abaixo e seguir as instruções.')
        //     .setFooter({
        //         text: `Desenvolvido por ${CONFIG.author.name}`,
        //         iconURL: `${CONFIG.author.icon}`
        //     });
        //
        // user.send({
        //     embeds: [verify_embed],
        // });
    }
}
