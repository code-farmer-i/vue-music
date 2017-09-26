import recommendApi from './recommend'
import SingerApi from './singer'
import RankApi from './rank'
import SearchApi from './search'

export default{
  ...recommendApi,
  ...SingerApi,
  ...RankApi,
  ...SearchApi
}
