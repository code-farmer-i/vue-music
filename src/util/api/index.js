import recommendApi from './recommend'
import SingerApi from './singer'
import RankApi from './rank'

export default{
  ...recommendApi,
  ...SingerApi,
  ...RankApi
}
