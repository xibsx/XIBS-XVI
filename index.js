const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR CODE RECEIVED. SCAN THIS!'); // Ujumbe rahisi wa kukusaidia kuona
});

client.on('ready', () => {
    console.log('Client is ready!');
    console.log('Bot is now connected to WhatsApp. Ready to receive messages.');
});

client.on('message', msg => {
    if (msg.body === '!test') {
        msg.reply('Hello! Your simple bot is working.');
    } else if (msg.body === '!ping') {
        msg.reply('Pong!');
    }
});

client.initialize();
