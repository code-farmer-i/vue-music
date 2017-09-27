export default {
  favoriteList: (()=>{
    let favorite = localStorage.getItem('favoriteList');

    return favorite ? Object.freeze(JSON.parse(favorite)) : []
  })()
}
