const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');
const CONFIG = require('../../../Config/app');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comboio-proximo')
        .setDescription('Podes ver qual é o próxmio comboio, para o destino que quiseres!')
        .addStringOption(option => option.setName('origem').setDescription('Origem do passageiro').setRequired(true))
        .addStringOption(option => option.setName('destino').setDescription('Destino do passageiro').setRequired(true)),
    async execute (interaction, client) {
        let message = await interaction.deferReply({
            fetchReply: true
        });

        let embed = new EmbedBuilder()
            .setColor("#28a745")
            .setTitle(`Próximo comboio: ${interaction.options.get('origem').value}  ${interaction.options.get('destino').value} `)
            .setURL(`${CONFIG.app.url}`)
            .setDescription('Informação sobre o próximo comboio com destino a ' + interaction.options.get('destino').value + ' a partir da estação ' + interaction.options.get('origem').value)
            .addFields([
                {
                    name: 'Partida prevista',
                    value: `21:12`,
                    inline: true
                },
                {
                    name: 'Chegada prevista',
                    value: '22:30',
                    inline: true},
                {
                    name: 'Estado',
                    value: 'Em atraso 5 minutos',
                    inline: true
                }
            ])
            .setTimestamp()
            .setFooter({
                text: 'Desenvolvido por Eduardo Bessa',
                iconURL: 'https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-1/292589484_410103894485783_4644531783182764935_n.jpg?stp=dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=c6021c&_nc_ohc=iqkjXjDqwIIAX9MSMgm&_nc_ht=scontent.flis5-3.fna&oh=00_AT-HYNBdh8kR6K_j2nbRZwn0Q6fPCnq039DqHqZvmq5kGg&oe=6337CD46'
            });

        await interaction.editReply({
            embeds: [embed]
        });
    }
}
