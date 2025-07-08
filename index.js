const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🤖 WhatsApp bot is running.');
});

app.listen(port, () => console.log(`🟢 Web server listening on port ${port}`));

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log("📱 Scan this QR to connect.");
});

client.on('ready', () => {
  console.log('✅ Bot is ready!');
});

client.on('message', msg => {
  if (msg.body.toLowerCase() === 'hi') {
    msg.reply('Hello from XIBS XVI bot running on Heroku!');
  }
});

client.initialize();