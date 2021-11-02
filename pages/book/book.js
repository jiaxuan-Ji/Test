/*
 * @Description: 
 * @Author: 老纪
 * @Date: 2021-11-01 15:38:04
 * @LastEditTime: 2021-11-01 16:20:02
 */
import { BookModel } from '../../models/book.js'
let bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //纯粹的回调函数callback；缺点：很容易进入回调地狱、return函数被剥夺
        //promise 解决回调地狱、剥夺return函数问题；
        //promise 解决代码风格问题；解决多个异步等待合并
        //es2017 出了 async await;但是微信小程序不支持  async await
        // 提前写一个BOOK数组保存数据：
        books: [],
        searching: false,
        more: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        bookModel.getHotList().then(res => {
                // return bookModel.getMyBookCount()
                this.setData({
                    books: res
                })
            })
            //正确的promise用法
            // .then(res => {
            //     console.log(res, 'api的调用结果');
            //     return bookModel.getMyBookCount()
            // })
            // .then(res => {
            //     console.log(res);
            // })
            //错误的promise用法
            // const hotList = bookModel.getHotList()
            // hotList.then(res => {
            //         console.log(res);
            //         bookModel.getMyBookCount().then(res => {
            //             console.log(res);
            //         })
            //         bookModel.getMyBookCount().then(res => {
            //             console.log(res);
            //         })
            //     })
            // Promise 是一个对象； 函数
            //对象 保存状态 函数 闭包函数
            // const promise = new Promise((resolve, reject) => {
            //     // pending表示进行中 fulfilled：已成功 rejected：以失败
            //     //状态一旦修改就凝固，不能再改变；例如：“进行中”的promise变成“已成功”的promise后，就不能从“已成功”的promise变成“进行中”的promise
            //     wx.getSystemInfo({
            //         success: res => resolve(res),
            //         fail: error => reject(error)

        //     })
        // })
        // promise.then(res => {
        //     console.log(res, '成功');
        // }, (error => {
        //     console.log(error, '失败');

        // }))
        //页面跳转
        //id
        // wx.navigateTo({
        //     url: 'url',
        // })
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