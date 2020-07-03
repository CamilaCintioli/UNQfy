const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
class NotificationService{
  constructor(){
    this.subscriptionsRecord={};
  }

  subscribe(artistId,email){
    this.subscriptionsRecord[artistId] = email;
    this.save();
  }

  static load() {
    const serializedData = fs.readFileSync('notification.json', { encoding: 'utf-8' });
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [NotificationService];
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

   

module.exports = NotificationService;