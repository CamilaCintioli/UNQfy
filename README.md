# UNQfy 

Seminario web -- 2020c1
Members: Camila Cintioli y Graciela Daglio.
## **Installing node**

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm).


## **Getting dependencies**

 - ```npm install```

## **Run UNQfy**

**Creation commands**
 - ```node main addArtist name {name} lastname {lastname} country {country}```

 - ```node main addAlbum idArtist {idArtist} title {title} ```

 - ```node main addTrack idAlbum {idAlbum} title {title} duration {duration} genres {genre1} {genre2} {genreN}```

 - ```node main createPlaylist title {title} duration {duration} genres {genre1} {genreN}```

*Note*: an album can't be created without an artist and a track can't be created without an album.

**Edition commands**

 - ```node main editArtist id {idArtist} fieldToEdit {newFieldValue} ```
 
 - ```node main editAlbum id {idAlbum} fieldToEdit {newFieldValue} ```
 
 - ```node main editTrack id {idTrack} fieldToEdit {newFieldValue} ```

**Deletion commands**
 - ```node main deleteArtist id {idArtist} ```
 
 - ```node main deleteAlbum id {idAlbum}```
 
 - ```node main deleteTrack id {idTrack} ```
 
  - ```node main deletePlaylist id {idPlaylist} ```

**Searching commands**
- ```node main getArtistById id {idArtist} ```
 
 - ```node main getAlbumById id {idAlbum}```
 
 - ```node main getTrackById id {idTrack} ```
 
  - ```node main getTracksMatchingGenres genres {genre1} {genre2} ```
  
   - ```node main getTracksMatchingArtist name {artistName}```

**Examples**

 - node main addArtist name Pepita lastname Gonzalez country Argentina
 - node main addTrack idAlbum 0 title "Fire in the house" duration 5 genres rock metal
 - node main editTrack id 0 title "Music" 
 - node main getTracksMatchingGenres genres metal pop
 
