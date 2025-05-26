import (
    whatsapp "github.com/Rhymen/go-whatsapp"
)

wac, err := whatsapp.NewConn(20 * time.Second)


qrChan := make(chan string)
go func() {
    fmt.Printf("qr code: %v\n", <-qrChan)
    //show qr code or save it somewhere to scan
}()
sess, err := wac.Login(qrChan)



text := whatsapp.TextMessage{
    Info: whatsapp.MessageInfo{
        RemoteJid: "0123456789@s.whatsapp.net",
    },
    Text: "Hello Whatsapp",
}

err := wac.Send(text)


contactMessage := whatsapp.ContactMessage{
			Info: whatsapp.MessageInfo{ 
                RemoteJid: "0123456789@s.whatsapp.net", 
                },
			DisplayName: "Luke Skylwallker",
			Vcard: "BEGIN:VCARD\nVERSION:3.0\nN:Skyllwalker;Luke;;\nFN:Luke Skywallker\nitem1.TEL;waid=0123456789:+1 23 456789789\nitem1.X-ABLabel:Mobile\nEND:VCARD",
		}

id, error := client.WaConn.Send(contactMessage)
