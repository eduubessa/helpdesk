const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');
const CONFIG = require('../../../Config/app');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Procurar ticket por ID!')
        .addStringOption(option => option.setName('id').setDescription('Identificação ùnica do ticket').setRequired(true)),
    async execute(interaction, client) {
        let message = await interaction.deferReply({
            fetchReply: true
        });

        axios.get(`${CONFIG.api.url}/tickets/${interaction.options.get('id').value}`).then(async (res) => {
            let ticket = res.data;
            let color, status, priority_text, supported_by = "";

            if (ticket.priority >= 15) {
                color = "#dc3545";
                priority_text = "Alta";
            } else if (ticket.priority >= 8 && ticket.priority < 15) {
                color = "#ffc107";
                priority_text = "Média";
            } else {
                color = "#28a745";
                priority_text = "Baixa";
            }

            if(ticket.is_closed) {
                color = "##7f8c8d";
                status = "Fechado";
            }else if(ticket.is_reopen && !ticket.is_closed){
                status = "Reaberto";
            }else{
                status = "Aberto";
            }

            if(ticket.supported_by == null) {
                status = "Aguarde,\n um momento ...";
                supported_by = "Aguarde, estamos à procura de um técnico disponível";
            }else{
                supported_by = `${ticket.supported_by.firstname} ${ticket.supported_by.lastname}`;
            }

            let embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(`Ticket: #${interaction.options.get('id').value}`)
                .setURL(`${CONFIG.app.url}`)
                .setDescription(ticket.title)
                .setThumbnail(`${CONFIG.app.url}/images/${ticket.created_by.avatar}`)
                .addFields([
                    {
                        name: 'Criado por',
                        value: `${ticket.created_by.firstname} ${ticket.created_by.lastname}`,
                        inline: true
                    },
                    {
                        name: 'Prioridade',
                        value: priority_text,
                        inline: true},
                    {
                        name: 'Estado',
                        value: status,
                        inline: true},
                    {
                        name: 'Técnico responsável pelo suporte:',
                        value: supported_by,
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

        }).catch(async (err) => {
            let embed = new EmbedBuilder()
                .setColor("#dc3545")
                .setTitle(`Ticket não encontrado`)
                .setDescription(`Não foi possível encontrar o ticket com o id: #${interaction.options.get('id').value}, verifique se o id está correto. Se o problema persistir, entre em contacto com o administrador de sistemas. Pode também enviar um email para geral@itspossible.pt a dar conhecimento do problema.`)
                .setTimestamp()
                .setFooter({
                    text: `Desenvolvido por ${CONFIG.author.name}`,
                    iconURL: `${CONFIG.author.icon}`
                });

            await interaction.editReply({
                embeds: [embed]
            });
        });
    }
};
