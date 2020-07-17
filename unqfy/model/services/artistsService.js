function addArtist(unqfy,artistData){
  const artist = unqfy.addArtist(artistData);
  unqfy.save('data.json');
  return artist;
}
  
function searchArtists(unqfy,name){
  if(name){
    return unqfy.searchArtistsByName(name);
  }
  return unqfy.getArtists();
}
  
function getArtistById(unqfy,id){
  return unqfy.getArtistById(id);
}
  
function updateArtist(unqfy,id,artistData){
  const artist = unqfy.updateArtist(id,artistData);
  unqfy.save('data.json');
  return artist;
}
  
function deleteArtist(unqfy,id){
  unqfy.deleteArtist(id);
  unqfy.save('data.json');
}

module.exports={addArtist,searchArtists,getArtistById,updateArtist,deleteArtist};