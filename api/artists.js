const express = require('express');
const artistRouter = express.Router();

artistRouter.route('/')
  .post((req,res) => {
    const artistData = {name:req.body.name,country:req.body.country};
    const newArtist = res.locals.unqfy.addArtist(artistData);
    res.locals.unqfy.save('data.json');
    res.send(newArtist);
  })
  .get((req,res) => {
    if(req.query.name){
      res.send(res.locals.unqfy.searchArtistsByName(req.query.name));
    }
    else {
      res.send(res.locals.unqfy.getArtists());
    }
  });

artistRouter.route('/:id')
  .get((req,res) => {
    const artistId = +req.params.id;
    res.send(res.locals.unqfy.getArtistById(artistId));
  })
  .put((req,res) => {
    const artistId = +req.params.id;
    const artistData = {
      name:req.body.name,
      country: req.body.country,
    };
    const updatedArtist = res.locals.unqfy.updateArtist(artistId,artistData);
    res.locals.unqfy.save('data.json');
    res.send(updatedArtist);
  })
  .delete((req,res) => {
    const artistId = +req.params.id;
    res.locals.unqfy.deleteArtist(artistId);
    res.locals.unqfy.save('data.json');
    res.send('Artista borrado exitosamente');
  });

module.exports = artistRouter;