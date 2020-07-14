const getGmailClient = require('../../gmailClient');

class EmailSender{
  constructor(){
    this.client = getGmailClient();
  }

  static load(){
    return new EmailSender();
  }

  send(receivers,subject,message){
    return Promise.all(receivers.map((receiver) => {
      this.client.users.messages.send(
        {
          userId: 'me',
          requestBody: {
            raw: this._createMessage(receiver,subject,message),
          },
        }
      );
    }));  
  }

  _createMessage(receiver,subject, body) {
    // You can use UTF-8 encoding for the subject using the method below.
    // You can also just use a plain string if you don't need anything fancy.
    
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      'From: UNQfy <unqfy20@gmail.com>',
      `To: ${receiver}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      body
    ];
    const message = messageParts.join('\n');
    
    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    return encodedMessage;
  }
}

module.exports = EmailSender;