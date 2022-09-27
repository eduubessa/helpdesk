const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('all-tickets')
        .setDescription('Replies with tickets! (only for admins)'),
    async execute(interaction, client){
        let message = await interaction.deferReply({
            fetchReply: true
        });

        let response = "Fetching tickets...";

      
        await interaction.editReply({
            content: response
        });
    }
};