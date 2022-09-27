module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        if(!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        
        if(!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Something went wrong while executing this command!',
                ephemeral: true
            });
        }
    }
}