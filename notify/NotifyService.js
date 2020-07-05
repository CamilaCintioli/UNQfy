const picklify = require('picklify');
const fs = require('fs');

class NotifyService {
  constructor(){
    this.subscribers = {};
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

  static load() {
    const serializedData = fs.readFileSync('notification.json', { encoding: 'utf-8' });
    const classes = [NotifyService];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
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