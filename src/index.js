const discord = require('discord.js');
const config = require('../config.json');
const dashboard_server = require('./server');

const client = new discord.Client({intents:[discord.GatewayIntentBits.Guilds]});

client.once(discord.Events.ClientReady, readyClient => {
	console.log(readyClient.user.tag);
    dashboard_server(readyClient);
});

client.login(config.token);