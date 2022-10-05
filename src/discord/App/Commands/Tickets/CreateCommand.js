const CONFIG = require('../../../Config/app.json');
const axios = require('axios');
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ticket')
        .setDescription('Criar um ticket, especifique o motivo para que o possamos ajudar!')
        .addStringOption(option => option.setName('title').setDescription('Título do ticket').setRequired(true))
        .addStringOption(option => option.setName('priority').setDescription('Prioridade').setRequired(true)),
    execute: async function (interaction, client) {
        let message = await interaction.deferReply({
            fetchReply: true
        });

        await axios.post(`${CONFIG.api.url}/users/discord`, {discord: interaction.user.id}).then(async (response) => {
                let user = response.data.user;

                let ticket = {};
                ticket.title = interaction.options.get('title').value;
                ticket.departament = "gaming";
                ticket.priority = interaction.options.get('priority').value;

                console.log(user);

                if (user !== null) {
                    ticket.created_by = `${user._id}`;
                    await axios.post(`${CONFIG.api.url}/tickets`, ticket).then(async (response) => {

                        let color, priority_text, status, supported_by = "";

                        if (response.data.ticket.priority >= 15) {
                            color = "#dc3545";
                            priority_text = "Alta";
                        } else if (response.data.ticket.priority >= 8 && ticket.priority < 15) {
                            color = "#ffc107";
                            priority_text = "Média";
                        } else {
                            color = "#28a745";
                            priority_text = "Baixa";
                        }

                        if(ticket.is_closed) {
                            color = "##7f8c8d";
                            status = "Fechado";
                        }else if(response.data.ticket.is_reopen && !response.data.ticket.is_closed){
                            status = "Reaberto";
                        }else{
                            status = "Aberto";
                        }

                        let embed = new EmbedBuilder()
                            .setColor(color)
                            .setTitle('Ticket criado com sucesso!')
                            .setDescription(`O seu ticket tem a referência: ${response.data.ticket._id} \nBrevemente atenderemos o seu ticket, aguarde por favor.\n\nPara ver o estado do seu ticket, use o comando ***/ticket ${response.data.ticket._id}***`)
                            .setFields([
                                {
                                    name: 'Título',
                                    value: response.data.ticket.title,
                                    inline: false
                                },
                                {
                                    name: 'Estado',
                                    value: status,
                                    inline: true
                                },
                                {
                                    name: 'Prioridade',
                                    value: priority_text,
                                    inline: true
                                }
                            ])
                            .setFooter({
                                text: 'Desenvolvido por Eduardo Bessa',
                                iconURL: 'https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-1/292589484_410103894485783_4644531783182764935_n.jpg?stp=dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=c6021c&_nc_ohc=iqkjXjDqwIIAX9MSMgm&_nc_ht=scontent.flis5-3.fna&oh=00_AT-HYNBdh8kR6K_j2nbRZwn0Q6fPCnq039DqHqZvmq5kGg&oe=6337CD46'
                            });

                        await interaction.editReply({
                            embeds: [embed]
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => { console.log(err); });
        }
    }
