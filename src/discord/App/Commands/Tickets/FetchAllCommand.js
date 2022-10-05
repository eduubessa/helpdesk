const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const axios = require("axios");
const CONFIG = require("../../../Config/app.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tickets')
        .setDefaultMemberPermissions((PermissionFlagsBits.Administrator | PermissionFlagsBits.ModerateMembers))
        .setDescription('Buscar todos os tickets! Apenas para administradores!'),
    async execute(interaction, client){
        let message = await interaction.deferReply({
            fetchReply: true
        });

        let embed = new EmbedBuilder()
            .setColor("#dc3545")
            .setTitle(`Neste momento ainda se encontram em desenvolvimento!`)
            .setDescription(`Esta funcionalidade ainda se encontra em desenvolvimento, estará disponivel em breve!\bO acesso a esta funcionalidade é apenas para administradores!\nObrigado pela compreensão`)
            .setTimestamp()
            .setFooter({
                text: `Desenvolvido por ${CONFIG.author.name}`,
                iconURL: `${CONFIG.author.icon}`
            });

        await interaction.editReply({
            embeds: [embed]
        });
    }
};
