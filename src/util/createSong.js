export default class createSong{
  constructor(song){
    this.id = song.songid;
    this.name = song.songname;
    this.singerName = song.singer[0].name;
    this.albumName = song.albumname;
    this.discImg = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`
  }
}
