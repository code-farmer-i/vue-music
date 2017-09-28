import recommendApi from './recommend'
import SingerApi from './singer'
import RankApi from './rank'
import SearchApi from './search'
import SongApi from './song'

export default{
  ...recommendApi,
  ...SingerApi,
  ...RankApi,
  ...SearchApi,
  ...SongApi
}
