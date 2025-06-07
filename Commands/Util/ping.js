module.exports = {
    data: {
        name: 'ping',
    },
    async execute(sock, m, messageType, args) {
        await sock.sendMessage(m.key.remoteJid, { text: 'Pong!' });
    },
};