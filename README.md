# UNQfy 

Seminario web -- 2020c1  
Members: Camila Cintioli y Graciela Daglio.
## **Installing node**

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm).


## **Getting dependencies**

 - ```npm install```

## **Run UNQfy**

**Script**
There's a script avaliable to create artists, albums, tracks and users. To use it, simply copy the lines of the script into your console.

**Commands**
**Creation commands**
 - ```node main addArtist {name} {country}```

 - ```node main addAlbum {idArtist} {title} ```

 - ```node main addTrack {idAlbum} {title} {duration} {genre1} {genre2} {genreN}```

 - ```node main createPlaylist {title} {duration} {genre1} {genreN}```

 - ```node main addUser {name} {lastname}```

*Note*: an album can't be created without an artist and a track can't be created without an album.

**Edition commands**

 - ```node main editArtist {idArtist} fieldToEdit {newFieldValue} ```
 
 - ```node main editAlbum {idAlbum} fieldToEdit {newFieldValue} ```
 
 - ```node main editTrack {idTrack} fieldToEdit {newFieldValue} ```

**Deletion commands**
 - ```node main deleteArtist {idArtist} ```
 
 - ```node main deleteAlbum {idAlbum}```
 
 - ```node main deleteTrack {idTrack} ```
 
  - ```node main deletePlaylist {idPlaylist} ```

**Searching commands**
- ```node main getArtistById {idArtist} ```
 
 - ```node main getAlbumById {idAlbum}```
 
 - ```node main getTrackById {idTrack} ```
 
- ```node main getTracksMatchingGenres {genre1} {genre2} ```
  
- ```node main getTracksMatchingArtist {artistName}```
 
- ```node main listenTrackByUser {userId} {trackId}```

- ```node main getTimesHeardATrack {userId} {trackId}```

- ```node main getTracksListenByUser {userId}```

- ```node main getTopTracksOfArtist {artistId}```