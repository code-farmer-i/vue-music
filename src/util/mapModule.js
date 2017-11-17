/*
* moduleStr: String
* props: Array
*example ('Play/xxx/xx', [prop1, prop2, ...])
*
* */

export default function(moduleStr, props){
  let map = {}
  const moduleNames = moduleStr.split('/')

  props.forEach(propName => {
    map[propName] = state => {
      let module = state;

      moduleNames.forEach(moduleName => {
        module = module[moduleName]
      })

      return module[propName]
    }
  })

  return map
}
