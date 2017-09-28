//因调用了不同的api 所以数据结构不一样

export default class createSong{
  constructor(song){
    this.id = song.id;
    this.name = song.title;
    this.singerName = song.singer.map((singer)=>{
      return singer.name
    }).join('、');
    this.albumName = song.album.mid;
    this.discImg = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg?max_age=2592000`
    this.title = `${this.name} - ${this.singerName}`
  }
}
