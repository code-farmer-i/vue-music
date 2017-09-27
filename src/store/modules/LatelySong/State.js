export default {
  latelyList: (()=>{
    let l = localStorage.getItem('latelyList');

    return l ? Object.freeze(JSON.parse(l)) : []
  })()
}
