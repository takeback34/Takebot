// Script to deploy bot commands

import { REST, Routes } from 'discord.js';
import 'dotenv/config';

// TODO: Better way to manage this
import commands from './commands/index.js';

const commandsToDeploy = [];
commands.forEach((command) => {
    if ('data' in command && 'execute' in command) {
        commandsToDeploy.push(command.data.toJSON());
    } else {
        console.error(`A command is missing one of required properties "data" or "execute": ${JSON.stringify(command)}`);
    }
});

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);

// Deploy commands
(async () => {
    try {
        console.log('Refreshing commands');

        // Refresh commands
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_BOT_CLIENT_ID, process.env.DISCORD_BOT_GUILD_ID),
            { body: commandsToDeploy },
        );

        console.log(`Successfully reloaded ${data.length} commands`);
    } catch (error) {
        console.error(error);
    }
})();
