export class createSong{
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

//因调用了不同的api 所以数据结构不一样

export class createSong2{
  constructor(song){
    this.id = song.id;
    this.name = song.title;
    this.singerName = song.singer.map((singer)=>{
      return singer.name
    }).join('、');
    this.songMid = song.mid;
    this.albumName = song.album.name;
    this.audioSrc = `http://ws.stream.qqmusic.qq.com/${song.id}.m4a?fromtag=46`
    this.discImg = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg?max_age=2592000`
    this.title = `${this.name} - ${this.singerName}`
  }
}
