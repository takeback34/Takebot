import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

// TODO: Better way to manage this
import commands from './commands/index.js';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
client.commands = new Collection();
commands.forEach((command) => {
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.error(`A command is missing one of required properties "data" or "execute": ${JSON.stringify(command)}`);
    }
});

// Run once when client is ready
client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} client ready!`);
});

// Interaction events
client.on(Events.InteractionCreate, async (interaction) => {
    // Exit if interaction is not a slash command
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Command not found: ${interaction.commandName}`);
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`An error occurred while executing command ${interaction.commandName}`);
        console.error(error);
    }
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);
