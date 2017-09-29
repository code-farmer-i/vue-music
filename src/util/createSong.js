export default class createSong{
  constructor(song){
    this.id = song.songid;
    this.name = song.songname;
    this.singerName = song.singer.map((singer)=>{
      return singer.name
    }).join('/');
    this.albumName = song.albumname;
    this.songMid = song.songmid;
    this.audioSrc = `http://ws.stream.qqmusic.qq.com/${song.songid}.m4a?fromtag=46`
    this.discImg = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`
  }
}
