// @ts-ignore
const proxy = require('http-proxy-middleware')

module.exports = function(app: any) {
  app.use(proxy('/api',
    {
        // "target": "http://localhost:8080",
        "target": "http://im.loheagn.com:8080",
        "changeOrigin": true
    }))
}
