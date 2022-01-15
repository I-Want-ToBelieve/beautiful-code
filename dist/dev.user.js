// ==UserScript==
// @name        beautiful-code [dev]
// @description 格式化并高亮代码块
// @namespace   github.com/backtolife2021
// @include     http*://*
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @require     https://unpkg.com/@vscode/vscode-languagedetection@1.0.21
// @require     https://unpkg.com/shiki@0.9.15/dist/index.unpkg.iife.js
// @require     https://unpkg.com/prettier@2.5.1/standalone.js
// @require     https://unpkg.com/prettier@2.5.1/parser-typescript.js
// @require     https://unpkg.com/prettier@2.5.1/parser-babel.js
// @version     1.0.1
// @homepage    https://github.com/backtolife2021/beautiful-code
// @author      backtolife
// @license     MIT
// @grant       GM.xmlHttpRequest
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==
/* eslint-disable no-undef */
/* eslint-disable compat/compat */
/* eslint-disable node/handle-callback-err */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/**  globals GM */

'use strict'
;(() => {
  const url = `http://localhost:8124/production.user.js?${Date.now()}`
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