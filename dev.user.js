/* eslint-disable no-undef */
/* eslint-disable compat/compat */
/* eslint-disable node/handle-callback-err */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/**  globals GM */

'use strict'
;(() => {
  const url = `http://localhost:%PORT%/production.user.js?${Date.now()}`
  new Promise((resolve, reject) => {
    const req = GM.xmlHttpRequest({
      method: 'GET',
      url: url,
      onload (r) {
        if (r.status !== 200) {
          reject(r)
          return
        }
        resolve(r.responseText)
      },
      onerror: (e) => reject(e),
    })
    if (req && 'catch' in req) {
      req.catch((err) => {
        /* ignore */
      })
    }
  })
    .catch((err) => {
      const log = (obj, b) => {
        let prefix = 'loadBundleFromServer: '
        try {
          prefix = GM.info.script.name + ': '
        } catch {}
        if (b) {
          console.log(prefix + obj, b)
        } else {
          console.log(prefix, obj)
        }
      }
      if (err && 'status' in err) {
        if (err.status <= 0) {
          log('Server is not responding')
          GM.getValue('scriptlastsource3948218', false).then((src) => {
            if (src) {
              log('%cExecuting cached script version', 'color: Crimson; font-size:x-large;')
              /* eslint-disable no-eval */
              eval(src)
            }
          })
        } else {
          log('HTTP status: ' + err.status)
        }
      } else {
        log(err)
      }
    })
    .then((s) => {
      if (s) {
        /* eslint-disable no-eval */
        eval(`${s} //# sourceURL=${url}`)
        GM.setValue('scriptlastsource3948218', s)
      }
    })
    .finally(() => void 0)
})()
