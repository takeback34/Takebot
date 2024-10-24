import { SlashCommandBuilder } from 'discord.js';

const command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping testing'),
    execute: async (interaction) => {
        await interaction.reply('pong');
    },
};

export default [command];
