import recommendApi from './recommend'
import SingerApi from './singer'

export default{
  ...recommendApi,
  ...SingerApi
}
