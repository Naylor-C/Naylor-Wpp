Este `README.md` detalha como configurar e usar o sistema de bot para WhatsApp, que inclui carregamento dinâmico de comandos e autenticação via QR Code.

---

# 🚀 WhatsApp Bot com Baileys

Este projeto oferece uma estrutura básica para criar um bot de WhatsApp usando a biblioteca `Baileys`, com um sistema de comandos modular e autenticação via QR Code.

---

## ✨ Funcionalidades

* **Conexão e Autenticação:** Conecta ao WhatsApp usando `Baileys` e gera um QR Code (no terminal e como `qr.png`) para autenticação inicial.
* **Reconexão Automática:** Tenta reconectar em caso de desconexão, a menos que a sessão seja encerrada intencionalmente.
* **Sistema de Comandos Modular:** Carrega comandos automaticamente de pastas específicas, permitindo adicionar novas funcionalidades facilmente.
* **Manipulação de Mensagens:** Processa mensagens recebidas e executa comandos baseados no prefixo `/`.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

* **Node.js**: Versão 16.x ou superior.
* **npm** ou **Yarn**: Gerenciador de pacotes.

---

## 📦 Instalação

Siga os passos abaixo para configurar o projeto:

1.  **Clone o repositório** (ou copie o código para um novo arquivo `index.js`):

    ```bash
    git clone <url_do_seu_repositorio>
    cd <nome_da_pasta>
    ```

    Se você copiou o código, crie um arquivo chamado `index.js` e cole o conteúdo fornecido.

2.  **Instale as dependências**:

    ```bash
    npm install @whiskeysockets/baileys qrcode
    # ou
    yarn add @whiskeysockets/baileys qrcode
    ```

---

## 🚀 Como Usar

### 1. Estrutura de Pastas

O bot espera que seus comandos estejam organizados em uma pasta chamada `Commands` na raiz do projeto. Dentro de `Commands`, você pode criar subpastas para organizar seus comandos (por exemplo, `Commands/Admin`, `Commands/Util`).

A estrutura deve ser similar a esta:

```
.
├── index.js
├── auth_info_baileys/ (criado automaticamente após a primeira conexão)
└── Commands/
    ├── Categoria1/
    │   └── meucomando.js
    └── Categoria2/
        └── outrocomando.js
```

### 2. Criando um Comando

Cada arquivo de comando (`.js`) deve exportar um objeto com as propriedades `data` e `execute`.

* `data`: Um objeto contendo o `name` do comando (que será usado após o `/` para invocar o comando).
* `execute`: Uma função assíncrona que será executada quando o comando for chamado. Ela recebe os seguintes argumentos:
    * `sock`: O objeto de conexão do Baileys, usado para enviar mensagens, etc.
    * `m`: O objeto da mensagem recebida.
    * `messageType`: O tipo de conteúdo da mensagem (ex: 'conversation', 'imageMessage').
    * `args`: Um array com os argumentos do comando (o que vem depois do nome do comando).

**Exemplo de comando (`Commands/Util/ping.js`):**

```javascript
module.exports = {
    data: {
        name: 'ping',
    },
    async execute(sock, m, messageType, args) {
        await sock.sendMessage(m.key.remoteJid, { text: 'Pong!' });
    },
};
```

Neste exemplo, ao digitar `/ping` no WhatsApp, o bot responderá com "Pong!".

### 3. Rodando o Bot

Para iniciar o bot, execute o seguinte comando no terminal na raiz do projeto:

```bash
node index.js
```

---

## 🤝 Primeira Conexão

Na primeira vez que você rodar o bot:

1.  Um **QR Code** será exibido no seu terminal.
2.  Um arquivo `qr.png` também será gerado na raiz do projeto.
3.  Use seu celular para escanear um desses QR Codes através da opção **"Aparelhos Conectados"** no seu WhatsApp.
4.  Após a autenticação, a pasta `auth_info_baileys` será criada para armazenar as credenciais da sessão, permitindo que você não precise escanear o QR Code novamente nas próximas vezes.

---

## 🚨 Resolução de Problemas

* **`[AVISO] O comando em ... está faltando "data" ou "execute"`**: Certifique-se de que seus arquivos de comando (`.js`) exportam um objeto com as propriedades `data` (com o nome do comando) e `execute` (a função do comando).
* **`[AVISO] Pasta de comandos não encontrada. Ignorando sistema de comandos.`**: Verifique se a pasta `Commands` existe na raiz do seu projeto.
* **Erro de conexão/QR Code não aparece**:
    * Verifique sua conexão com a internet.
    * Certifique-se de que as dependências foram instaladas corretamente (`npm install`).
    * Se o QR Code ainda não aparecer ou der erro, tente excluir a pasta `auth_info_baileys` (se existir) e execute o bot novamente para gerar um novo QR Code.

---

## ❓ Precisa de ajuda?

Se tiver dúvidas ou encontrar problemas, sinta-se à vontade para abrir uma *issue* no repositório (se for um projeto Git) ou revisar a documentação oficial do `Baileys`.
