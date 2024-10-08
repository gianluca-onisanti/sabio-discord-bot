const dotenv = require('dotenv'); 
dotenv.config();

const { Client, GatewayIntentBits, Collection, REST, Routes, SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

// Definindo as variáveis de ambiente
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

// Criação do cliente Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Carregando os comandos
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Registro de comandos
const commands = commandFiles.map(file => require(`./commands/${file}`).data.toJSON());

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

// Interação com comandos
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Ocorreu um erro ao executar esse comando!', ephemeral: true });
    }
});

// Login do cliente
client.login(token);
