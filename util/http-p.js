/*
 * @Description:
 * @Author: 老纪
 * @Date: 2021-10-28 17:47:20
 * @LastEditTime: 2021-10-29 16:55:44
 */
// 在import的时候不要使用绝对路径，而是使用相对路径
import { config } from '../config.js'
const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效，请前往www.7yue.pro申请',
    3000: '期刊不存在',
}
class HTTP {
    request({ url, data = {}, method = 'GET' }) {
            // const promise=new Promise
            return new Promise((resolve, reject) => {
                this._request(url, resolve, reject, data, method)
            })
        }
        //resolve,reject是必填参数，位置不能乱放
    _request(url, resolve, reject, data = {}, method = 'GET') {
            //url, data, method
            wx.request({
                url: config.api_base_url + url,
                method: method,
                data: data,
                header: {
                    'content-type': 'application/json',
                    appkey: config.appkey,
                },
                success: (res) => {
                    // startsWith
                    // endsWith
                    const code = res.statusCode.toString()
                    if (code.startsWith('2')) {
                        resolve(res.data)
                            // params.success && params.success(res.data)
                    } else {
                        reject()
                        const error_code = res.data.error_code
                        this._show_error(error_code)
                            //服务器异常
                            //   wx.showToast({
                            //     title: '错误',
                            //     icon: 'none',
                            //     duration: 2000,
                            //   })
                    }
                },
                fail: (err) => {
                    //   api调用失败
                    // wx.showToast({
                    //   title: '错误',
                    //   icon: 'none',
                    //   duration: 2000,
                    // })    
                    reject()
                    this._show_error(1)
                },
            })
        }
        //   show_error前的下划线 代表该方法是一个私有方法
    _show_error(error_code) {
        console.log(error_code, tips[error_code], '显示异常码');
        if (!error_code) {
            error_code = 1
        }

        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000,
        })
    }
}
export { HTTP }