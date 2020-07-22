# UNQfy 

Seminario web -- 2020c1  
Members: Camila Cintioli y Graciela Daglio.
## **Installing node**

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm).

## **Getting dependencies**

 - ```npm install```

# Visado 3

To run docker, you will need to add some files in the project first:

## UNQfy

### spotifyCreds.json

Go to **/unqfy/credentials** and run in your terminal:
```node generateSpotifyCredentials.js```
You will have to click the link provided in your terminal, log with your spotify account. This will generate the file spotifyCreds.json with the access token. 
You'll have to move this file to credentials folder.

## Monitor service

### slackUrl.js

Go to **/monitor** and create a file called slackUrl.js. This file should have a constant called slackUrl with the slack hook url. It should look something like this:
```javascript
const slackUrl = 'your hook in slack';
module.exports = { slackUrl };
```

## Notify service

### token.json

Go to **/notify**

Run ```node getOAuthToken.js``` and click the url in the terminal. You should log in gmail and authorize the app. 
You should copy and paste the link given in the console where you executed getOAuthToken.js and this will create the file ```token.json```.

## Docker-compose

To run the app with docker-compose, you should have previously installed docker and docker-compose. Then simply run in a console:
```docker-compose up```


# Visado 1

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

## **UML**

![uml](./UNQfyUML.svg "Diagrama de clases")
