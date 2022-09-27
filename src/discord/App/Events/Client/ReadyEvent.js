module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`Logged in as ${client.user.tag}!`);
        console.log(`Bot is ready on ${client.guilds.cache.size} servers, for ${client.users.cache.size} users.`);
    }
}