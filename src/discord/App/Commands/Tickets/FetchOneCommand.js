const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const CONFIG = require('../../../Config/app');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Response with ticket by id! (only for admins)')
        .addStringOption(option => option.setName('id').setDescription('Identificação ùnica do ticket').setRequired(true)),
    async execute(interaction, client){
        let message = await interaction.deferReply({
            fetchReply: true
        });

        /*
        axios.post(`http://localhost:3000/tickets/${interaction.options.get('id')}`).then(async (res) => {
            if(res.data.response.status === 404) return interaction.editReply({content: "Ticket não encontrado!"});



        }).catch((err) => {
            console.error(err);
            response = "Erro ao buscar tickets!";
        });
        */
       
        let embed = new EmbedBuilder()
            .setColor(0xdc3545)
            .setTitle(`Ticket: #${interaction.options.get('id').value}`)
            .setURL(`${CONFIG.app.url}`)
            .setDescription('Eu preciso de um ficheiro de base de dados, com todos os candidatos ao cliente do Santander, mas não consigo fazer download!')
            .setThumbnail('https://scontent.flis5-4.fna.fbcdn.net/v/t1.6435-9/188677590_6062618203750078_5248528753591067524_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gHuu73GFITkAX92SYGi&_nc_ht=scontent.flis5-4.fna&oh=00_AT885lFazm1ABGN6F67dMRfdCZbtn5wzGLzMZ9ZozNJL4w&oe=6358090E')
            .addFields([
                    { name: 'Criado por', value: 'Tatiana Sanches', inline: true },
                    { name: 'Prioridade', value: 'Urgente', inline: true },
                    { name: 'Estado', value: 'Em resolução...', inline: true }, 
                    { name: 'Técnico responsável pelo suporte:', value: 'Eduardo Bessa', inline: true }
                ])
            .setTimestamp()
            .setFooter({ text: 'Desenvolvido por Eduardo Bessa', iconURL: 'https://scontent.flis5-3.fna.fbcdn.net/v/t39.30808-1/292589484_410103894485783_4644531783182764935_n.jpg?stp=dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=c6021c&_nc_ohc=iqkjXjDqwIIAX9MSMgm&_nc_ht=scontent.flis5-3.fna&oh=00_AT-HYNBdh8kR6K_j2nbRZwn0Q6fPCnq039DqHqZvmq5kGg&oe=6337CD46' });

        await interaction.editReply({
            embeds: [embed]
        });

    }
};