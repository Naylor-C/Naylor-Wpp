const { useMultiFileAuthState, makeWASocket } = require('@whiskeysockets/baileys');

async function main() {
    // Configuração de autenticação (os tokens serão armazenados em arquivos)
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    // Criação do socket do WhatsApp
    const sock = makeWASocket({
        printQRInTerminal: true, // Exibe o QR Code no terminal
        auth: state
    });

    // Evento para quando o QR Code for gerado
    sock.ev.on('connection.update', (update) => {
        const { qr } = update;
        if (qr) {
            console.log('Escaneie o QR Code abaixo para se conectar:');
            // O QR Code será exibido no terminal
        }
    });

    // Evento para quando as credenciais forem atualizadas
    sock.ev.on('creds.update', saveCreds);

    // Evento para quando estiver conectado
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('Conectado ao WhatsApp com sucesso!');
        }
    });
}

main().catch(err => console.log(err));
