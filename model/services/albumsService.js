function addAlbum(unqfy,artistId,albumData){
  const album = unqfy.addAlbum(artistId,albumData);
  unqfy.save('data.json');
  return album;
}
    
function searchAlbums(unqfy,title){
  if(title){
    return unqfy.searchAlbumsByTitle(title);
  }
  return unqfy.getAlbums();
}
    
function getAlbumById(unqfy,id){
  return unqfy.getAlbumById(id);
}
    
function updateAlbum(unqfy,id,albumData){
  const album = unqfy.updateAlbum(id,albumData);
  unqfy.save('data.json');
  return album;
}
    
function deleteAlbum(unqfy,id){
  unqfy.deleteAlbum(id);
  unqfy.save('data.json');
}
  
module.exports={addAlbum,searchAlbums,getAlbumById,updateAlbum,deleteAlbum};