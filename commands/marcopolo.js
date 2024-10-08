const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('marco')
        .setDescription('Responde com Polo!'),
    async execute(interaction) {
        await interaction.reply('Polo!');
    },
};
