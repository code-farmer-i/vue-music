export const HOST = 'https://c.y.qq.com'

export const proxyTable = process.env.NODE_ENV === 'production' ? '/vue-music' : 'https://ckang1229.wang/vue-music'

//公共參數
export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

