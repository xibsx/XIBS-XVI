const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

client.on('message', msg => {
    if (msg.body.toLowerCase() === 'hi') {
        msg.reply('Hello! This is your bot.');
    }
});

client.initialize();