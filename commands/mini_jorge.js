const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mini-jorge')
        .setDescription('Veja onde o Mini Jorge está no momento!'),
    async execute(interaction) {
        // Gerar um índice aleatório entre 0 e 9
        const rand = Math.floor(Math.random() * 10); // 10 para incluir o 9
        const place = [
            'matando uma maldita serpente!',
            'fazendo negócios com o Kellan.',
            'em Naraka, pescando carpas.',
            'cruzando uma tempestade em pleno deserto de Krafius.',
            'rezando na Igreja de Tinta em Caronte.',
            'passeando nos Campos de Prata no período de neve.',
            'no bolso do Jorge, tirando um cochilo.',
            'operando uma pequena revolução em um ninho de ratos.',
            'testando novas tecnologias em Hefestea.',
            'almoçando!',
        ];

        await interaction.reply('Mini Jorge está ' + place[rand]);
    },
};
