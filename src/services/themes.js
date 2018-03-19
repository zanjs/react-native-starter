import request from '../utils/request'
/**
 * @desc 主题日报列表
 * @param {Object} body
 */

export const fetchThemeList = async () => {
  console.log("___fetching")
  return request('/api/4/themes')
}
