const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const CONFIG = require('../../Config/discord');

module.exports = async (client) => {
    client.CommandsHandler = async () => {
        console.log("\n\x1b[32mLoading commands...\x1b[37m");

        let commands_files = fs.readdirSync('./App/Commands');
        const { commands, commandsArray } = client;

        for(let command_file of commands_files) {
            if(fs.statSync(`./App/Commands/${command_file}`).isDirectory()) {
                let commands_subdir_files = fs.readdirSync(`./App/Commands/${command_file}`).filter(file => file.endsWith('Command.js'));
                for(let command_subdir_file of commands_subdir_files) {
                    let command = require(`../Commands/${command_file}/${command_subdir_file}`);
                    commands.set(command.data.name, command);
                    commandsArray.push(command.data.toJSON());
                    console.log(`Loaded: App/Commands/${command_file}/${command_subdir_file}`);
                }
            }else{
                let command = require(`../Commands/${command_file}`);
                commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());
                console.log(`Loaded: App/Commands/${command_file}`);
            }
        }

        console.log("\n\n");

        const clientId = "594504373531312130";
        const guildId = "743046221148586024";
        const rest = new REST({ version: '9' }).setToken(CONFIG.development.token);

        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(
                Routes.applicationCommands(clientId, guildId),
                { body: commandsArray },
            );
            console.log('Successfully reloaded application (/) commands.');
        }catch(error){
            console.error(error);
        }

    }
}