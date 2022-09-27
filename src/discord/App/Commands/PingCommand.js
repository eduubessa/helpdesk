const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client){
        let message = await interaction.deferReply({
            fetchReply: true
        });

        let ping = `API Latency: ${client.ws.ping}ms\nMessage Latency: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        await interaction.editReply({
            content: ping
        });
    }
};