const express = require('express');
const discord = require('discord.js');

module.exports = (client) => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(express.static('./src/server/static/'));

    app.get('/api/botinfo', (request, response) => {
        const guilds = []
        client.guilds.cache.forEach(guild => {
            guilds.push({'name': guild.name, 'id': guild.id, 'member_count': guild.memberCount, 'icon_url': guild.iconURL()})
        });
        response_data = {
            'bot': {
                'name': client.user.tag,
                'id': client.user.id,
                'avatar_url': client.user.displayAvatarURL()
            },
            'guilds': guilds,
            'guild_count': client.guilds.cache.size,
            'user_count': client.users.cache.size,
        }
        response.json(response_data);
    });

    app.put('/api/status/online', (request, response) => {
        client.user.setStatus('online');
        response.send("OK");
    });

    app.put('/api/status/idle', (request, response) => {
        client.user.setStatus('idle');
        response.send("OK");
    });

    app.put('/api/status/dnd', (request, response) => {
        client.user.setStatus('dnd');
        response.send("OK");
    });

    app.put('/api/status/invisible', (request, response) => {
        client.user.setStatus('invisible');
        response.send("OK");
    });

    app.put('/api/activity', (request, response) => {
        client.user.setActivity(request.body['activity'], {type:discord.ActivityType.Custom});
        response.send('OK');
    });

    app.listen(8000);
}