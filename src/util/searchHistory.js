const addQuery = function(query){
  const queryHistory = this.getQuery();

  queryHistory.unshift(query);

  localStorage.setItem('queryHistory', JSON.stringify([...new Set(queryHistory)]))
}

const getQuery = function(){
  const queryHistory = localStorage.getItem('queryHistory');

  return queryHistory ? JSON.parse(queryHistory) : []
}

const deleteQuery = function(idx){
  const queryHistory = this.getQuery();

  Array.prototype.splice.call(queryHistory, idx, 1)

  localStorage.setItem('queryHistory', JSON.stringify(queryHistory))
}

const clearQuery = function(){
  localStorage.removeItem('queryHistory')
}

export default {
  addQuery,
  getQuery,
  deleteQuery,
  clearQuery
}
