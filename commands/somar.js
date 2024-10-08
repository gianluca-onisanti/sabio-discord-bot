const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('somar')
        .setDescription('Soma dois números.')
        .addNumberOption(option =>
            option.setName('num1')
                .setDescription('Primeiro número')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('num2')
                .setDescription('Segundo número')
                .setRequired(true)),
    async execute(interaction) {
        const num1 = interaction.options.getNumber('num1');
        const num2 = interaction.options.getNumber('num2');
        const result = num1 + num2;
        await interaction.reply(`O resultado é: ${result}`);
    },
};
