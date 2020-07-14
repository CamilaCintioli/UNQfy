const ARTIST_DOESNT_EXIST_ERROR = 'ArtistDoesNotExist';
const NOTIFY_ERROR = 'NotifyError';


class NotifyError extends Error{
  constructor(){
    super('No se pudo enviar las notificaciones'); 
    this.name = NOTIFY_ERROR;
  }
}

module.exports={ARTIST_DOESNT_EXIST_ERROR, NOTIFY_ERROR, NotifyError};