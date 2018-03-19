import isEmptyObject from "outils/isEmptyObject"
import stringfyQueryString from "outils/stringfyQueryString"
import { codeMessage } from './enums'

const baseURL = 'https://news-at.zhihu.com'

/**
 * @desc http 状态码统一校验
 * @param {*} response
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  const error = new Error(errortext)
  error.response = response
  throw error
}
/**
 * @desc 根据code统一拦截函数
 * @param {*} response
 */
function commonCodeCancal(response) {
  const data = response.json()
  data.then((res) => {
    switch (res.code) {
      default: {
        break
      }
    }
  })
  return data
}

export default (url = "", options = {}) => {
  const {
    header = {},
    method = "GET",
    data = {},
    params = {},
    credentials = 'include'
  } = options
  let originUrl = url

  // 没有http[s]头部的url.统一添加请求地址
  if (!/^http[s]{0,1}:\/\//.test(url)) originUrl = `${baseURL}${url}`

  // 序列化查询字符串参数
  if (!isEmptyObject(params)) originUrl = `${originUrl}?${stringfyQueryString(params)}`

  const newOptions = {
    header: Object.assign({
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }, header),
    method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"].indexOf(method) > -1 ? method : "GET",
    body: data instanceof FormData ? data : JSON.stringify(data),
    credentials,
  }
  if (method === "GET" || method === "HEAD") delete newOptions.body // 强制要求GET HEAD 不带body参数

  return fetch(originUrl, newOptions)
    .then(checkStatus)
    .then(commonCodeCancal)
    .then(response =>
       response
    )
}
