/*
 * @Description:
 * @Author: 老纪
 * @Date: 2021-10-29 11:37:01
 * @LastEditTime: 2021-10-29 15:16:53
 */
import { HTTP } from '../util/http.js'
// 继承HTTP，因为HTTP是个类
class ClassicModel extends HTTP {
    // 去服务器加载最新的期刊
    getLatest(sCallback) {
        //原来是 需要http.request实例化，现在因为extends继承，直接用this.request
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallback(res)
                this._setLatestIndex(res.index)
                    //每次获取到数据后，都把classic写入到缓存中
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            },
        })
    }
    getClassic(index, nextOrPrevious, sCallback) {
        // 缓存中寻找 or API 从服务器加载来的数据还要写入到缓存中
        // 对于期刊数据在缓存中需要一个key 所以要确定key
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    //把请求到的数据写入到缓存中
                    wx.setStorageSync(
                        this._getKey(res.index), res)
                    sCallback(res)
                }
            })
        } else {
            //如果在缓存中获取到classic，就直接调用sCallback回调函数将classic返回
            sCallback(classic)
        }
    }

    // 获取前一期
    getRight(index, callback) {
            let key = this._getKey(index - 1)
            let classic = wx.getStorageSync(key)
            if (!classic) {
                this.request({
                    url: 'classic/' + index + '/previous',
                    success: (res) => {
                        wx.setStorageSync(this._getKey(res.index), res)
                        callback(res);
                    }
                })
            } else {
                callback(classic)
            }
        }
        // 获取下一期
    getLeft(index, callback) {
        let key = this._getKey(index + 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            this.request({
                url: 'classic/' + index + '/next',
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res)
                    callback(res);
                }
            })
        } else {
            callback(classic)
        }
    }
    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }


    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }

    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
            const index = wx.getStorageSync('latest')
            return index
        }
        //私有的方法  用下划线表示、
        //设置参数 index为期刊序号
    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
}
export { ClassicModel }