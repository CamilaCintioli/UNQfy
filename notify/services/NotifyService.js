const picklify = require('picklify');
const fs = require('fs');
const { NotifyError } = require('../exceptions');

class NotifyService {
  subscribers = {};
  emailSender = null;
  constructor(emailSender){
    this.subscribers = {};
    this.emailSender = emailSender;
  }

  subscribe(artistId,email){
    const subscribers = this.subscribers[+artistId];
    if(subscribers){
      subscribers.push(email);
    } else {
      this.subscribers[+artistId] = [email]; 
    }
    this.save();
  }

  unsubscribe(artistId,email){
    const subscribers = this.subscribers[artistId];
    if(subscribers){
      this.subscribers[artistId] = subscribers.filter(mail => mail !== email);
      this.save();
    }
  }

  getSubscribersForArtistId(artistId){
    return this.subscribers[artistId] || [];
  }

  deleteSubscribersOfArtistId(artistId){
    delete this.subscribers[artistId];
  }

  notify(artistId,subject,message){
    const subscribers = this.getSubscribersForArtistId(artistId);
    return this._notifySubscribers(subscribers, subject, message);
  }

  _notifySubscribers(subscribers, subject, message){
    return this.emailSender.send(subscribers, subject, message)
      .catch(() => {throw new NotifyError();});
  }

  setEmailSender(emailSender){
    this.emailSender = emailSender;
  }

  static load(filename) {
    if(fs.existsSync(filename)){
      const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
      const classes = [NotifyService];
      const notifyService = picklify.unpicklify(JSON.parse(serializedData), classes);
      return notifyService;
    }
    return new NotifyService();
  }

  save(){
    const listenersBkp = this.listeners;
    this.listeners = [];
    const serializedData = picklify.picklify(this);
    this.listeners = listenersBkp;
    fs.writeFileSync('notification.json', JSON.stringify(serializedData, null, 2));
  }
}

module.exports = NotifyService;