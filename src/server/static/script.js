const xhr = new XMLHttpRequest();

xhr.open('GET', './api/botinfo')

xhr.onload = () => {
    if(xhr.readyState === xhr.DONE) {
        if(xhr.status === 200) {
            if(xhr.responseURL.includes('/api/botinfo')) {
                const botinfo = JSON.parse(xhr.responseText);
                document.title = `BotDash(${botinfo['bot']['name']})`;
                const application_element = document.body.getElementsByClassName('application')[0];
                const avatar_element = document.createElement('img');
                avatar_element.setAttribute('src', botinfo['bot']['avatar_url']);
                application_element.appendChild(avatar_element);
                application_element.appendChild(document.createElement('br'));
                application_element.appendChild(document.createTextNode(`${botinfo['bot']['name']}(${botinfo['bot']['id']})`));
                application_element.appendChild(document.createElement('br'));
                application_element.appendChild(document.createTextNode(`ユーザー数: ${botinfo['user_count']}`));
                application_element.appendChild(document.createElement('br'));
                application_element.appendChild(document.createTextNode(`サーバー数: ${botinfo['guild_count']}`));
                const guilds_element = document.body.getElementsByClassName('guilds')[0];
                botinfo['guilds'].forEach(guild => {
                    const guild_element = document.createElement('div');
                    guild_element.appendChild(document.createTextNode(`${guild['name']}(${guild['id']}) メンバー数:${guild['member_count']}`));
                    guilds_element.appendChild(guild_element);
                });
            }
        }
    }
}

xhr.send()

function change_status(status) {
    xhr.open('PUT', `./api/status/${status}`);
    xhr.send();
}

function send_activity() {
    const activity_element = document.body.getElementsByClassName('activity');

    xhr.open('PUT', './api/activity');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`activity=${activity_element[0]['value']}`);
}