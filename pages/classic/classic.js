import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classic = new ClassicModel()
let Like = new LikeModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        classicData: null,
        latest: true,
        first: false,
        likeCount: 0,
        likeStatus: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        console.log(`${this.text()}123`);
        // 借助缓存当获取到最新一期的期刊号后把其保存下来
        classic.getLatest((res) => {
            // this._getLikeStatus(res.id,res.type)
            this.setData({
                    // 如果使用扩展运算符:...res，就能直接展开res
                    classicData: res,
                    likeCount: res.fav_nums,
                    likeStatus: res.like_status
                })
                // latestsClassic获取=>lastestIndex;currentClassic获取=>currentIndex
                // 只需要比较currentIndex是否等于lastestIndex就知道是否是最新一期

        })

    },
    text: function() {
        return 123;
    },
    onLike: function(event) {
        console.log(event)
        let behavior = event.detail.behavior;
        console.log(behavior);
        Like.likePost(behavior, this.data.classicData.id, this.data.classicData.type)
    },

    onLeft: function(event) {

    },
    // 获取上一期
    onRight: function(event) {
        let index = this.data.classicData.index
        classic.getRight(index, (res) => {
            this._getLikeStatus(res.id, res.type)
            this.setData({
                classicData: res,
                latest: classic.isLatest(res.index),
                first: classic.isFirst(res.index),
            })
        })
    },
    // 获取下一期
    onLeft: function(event) {
        let index = this.data.classicData.index
        classic.getLeft(index, (res) => {
            this._getLikeStatus(res.id, res.type)
            if (res) {
                this.setData({
                    classicData: res,
                    latest: classic.isLatest(res.index),
                    first: classic.isFirst(res.index)
                })
            }
        })
    },

    getPrevious(index, sCallback) {
        this._getClassic(index, 'previous', sCallback)
    },

    getNext(index, sCallback) {
        this._getClassic(index, 'next', sCallback)
    },

    _getClassic(index, next_or_previous, sCallback) {
        let key = next_or_previous == 'next' ? this._fullKey(index + 1) :
            this._fullKey(index - 1)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            let params = {
                // url: 'classic/' + index + '/' + next_or_previous,
                // 使用模板字符串：url:`classic/${index}/${next_or_previous}`
                success: (data) => {
                    let key = this._fullKey(data.index)
                    wx.setStorageSync(key, data)
                    sCallback(data)
                }
            }
            this.request(params)
        } else {
            sCallback(classic)
        }
    },

    _getLikeStatus: function(artID, category) {
        Like.getClassicLikeStatus(artID, category, (res) => {
            this.setData({
                likeCount: res.fav_nums,
                likeStatus: res.like_status
            })
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})