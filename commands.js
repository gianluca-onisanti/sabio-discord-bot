const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

const { SlashCommandBuilder } = require('discord.js');

// Defina seus comandos aqui
const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!'),
    new SlashCommandBuilder()
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
    // ... outros comandos
].map(command => command.toJSON()); // Converte para JSON

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();