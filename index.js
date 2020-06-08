const express = require('express');
const app = express();
const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

const unqfy = getUNQfy();

app.post('/api/artists', (req, res) => {

  const name = req.body.name;
  const country = req.body.country;
  const artist = unqfy.addArtist({ name, country });
  unqfy.save('data.json');
  res.status(201).json({ code: 201, codeStatus: 'Created', artist: artist });

});

app.get('/api/artist/:id', (req, res) => {
  const artistId = parseInt(req.params.id);
  const artist = unqfy.getArtistById(artistId);
  console.log('artist', artist);
  res.status(200).json({ code: 200, codeStatus: 'OK', artist: artist });
});

app.put('/api/artists/:id', (req, res) => {
  const artistId = parseInt(req.params.id);
  const name = req.body.name;
  const country = req.body.country;
  const modifiedArtist = unqfy.updateArtist(artistId,{name,country});
  unqfy.save('data.json');
  res.status(200).json({code:200,codeStatus:'OK',artist:modifiedArtist});


});

app.delete('/api/artists',(req,res) => {
  const artistId = parseInt(req.query.id);
  unqfy.deleteArtist(artistId);
  unqfy.save('data.json');
  res.status(204).json({code:204});
});

app.get('/api/artists',(req,res) => {
  const artistName = req.query.name;
  const artists = unqfy.searchArtistsByName(artistName);
  res.status(200).json({code:200,codeStatus:'OK',artists:artists});
});

//
//

app.post('/api/albums', (req, res) => {

  const artistId = req.body.artistId;
  const title = req.body.title;
  const year = parseInt(req.body.year);
  const album = unqfy.addAlbum(artistId, {title, year});
  unqfy.save('data.json');
  res.status(201).json({ code: 201, codeStatus: 'Created', album:album });

});

app.get('/api/album/:id', (req, res) => {
  const albumId = parseInt(req.params.id);
  const album= unqfy.getAlbumById(albumId);
  console.log('album: ', album);
  res.status(200).json({ code: 200, codeStatus: 'OK', album: album });
});

app.put('/api/albums/:id', (req, res) => {
  const albumId = parseInt(req.params.id);
  const title = req.body.title
  const year = parseInt(req.body.year);

  const modifiedAlbum = unqfy.updateAlbum(albumId,{title, year});
  unqfy.save('data.json');
  res.status(200).json({code:200,codeStatus:'OK',album:modifiedAlbum});
});

app.delete('/api/albums',(req,res) => {
  const albumId = parseInt(req.query.id);
  unqfy.deleteAlbum(albumId);
  unqfy.save('data.json');
  res.status(204).json({code:204});
});

app.get('/api/albums',(req,res) => {
  const albumName = req.query.name;
  const albums = unqfy.searchAlbumsByName(albumName);
  res.status(200).json({code:200,codeStatus:'OK',albums:albums});
});

///////




app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});