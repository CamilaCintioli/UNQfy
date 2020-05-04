class User{
    constructor(id, name, lastname){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.tracksHeard = [];
        this.timeTrackHeard = 0;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }
    
    
    addTrackHeard(track){
        return this.tracksHeard.push(track);
    }

    trackHeard(trackData){
        if (this.tracksHeard.map(track => track.getId()).includes(trackData.getId())){
            this.tracksHeard.find(track => track.getId() === trackData.getId()).addTimeTrackHeard(trackData);
        }
        else{
            console.log("La canción ", trackData.getName(), "no está en esta plyList");
        } 
    }

    addTimeTrackHeard(trackData){
        this.timeTrackHeard = this.timeTrackHeard + trackData.getDuration();
    }

}

module.exports = User;


