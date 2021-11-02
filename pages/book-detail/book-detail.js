import {
    BookModel
} from '../../models/book.js'

import {
    LikeModel
} from '../../models/like.js'
const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        book: null,
        likeStatus: false, //点赞状态
        likeCount: 0, //点赞的数量
        posting: false, //用户是否打开点评输入框
        comments2: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //等待的提示
        wx.showLoading()
            // id就是从外面获取到的id,在book组件点击事件中定义传递id的变量叫bid，所以这里也取bid
        const bid = options.bid;
        const detail = bookModel.getDetail(bid);
        const comments = bookModel.getComments(bid);
        const likeStatus = bookModel.getLikeStatus(bid);
        // 从promise中用then方法取数据,同时发送三个请求
        // 合并多个promise的实例，只有在三个子promise的请求发送完毕以后才会执行
        Promise.all([detail, comments, likeStatus])
            .then(res => {
                console.log(res, 'Promise.all')
                this.setData({
                        book: res[0], //取到Promise.all()中数组中的 第一个数据
                        comments: res[1],
                        comments2: res[1].comments,
                        likeStatus: res[2].like_status,
                        likeCount: res[2].fav_nums
                    })
                    //隐藏Loading
                wx.hideLoading()
            })

        // detail.then(res => {
        //     this.setData({
        //         book: res
        //     });

        // })
        // comments.then(res => {
        //     this.setData({
        //         comments: res,
        //         comments2: res.comments
        //     })
        // })
        // likeStatus.then(res => {
        //     this.setData({
        //         likeStatus: res.like_status,
        //         likeCount: res.fav_nums
        //     })
        // })
    },
    onLike(event) {
        console.log(event, 'event喜欢');
        const like_or_cancel = event.detail.behavior;
        likeModel.likePost(like_or_cancel, this.data.book.id, 400)
    },
    onFakePost(event) {
        this.setData({
            posting: true
        })
    },
    onCancel(event) {
        this.setData({
            posting: false
        })
    },
    onPost(event) {
        // 这个有可能是点击tag发送的事件，也有可能是input输入框里发送来的事件
        // 获取点击tag传递的文字：
        // const comment=event.detail.text;
        // 获取input里的值
        // const commentInput=event.detail.value;
        // 合并以上：
        const comment = event.detail.text || event.detail.value
            // const comment = event.detail.text
            // const commentInput = event.detail.value
        console.log(comment, '2222')
        if (!comment) {
            // 如果没有输入短评则直接退出(防止用户输入空字符)
            return
        }
        // 限制用户短评字数后调用服务器api提交到服务器
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }
        bookModel.postComment(this.data.book.id, comment)
            .then(res => {
                wx.showToast({
                        title: '+1',
                        icon: 'none'
                    })
                    // 把用户添加的短评添加到comments这个数组中
                console.log(this.data.comments2)
                    //unshift将新的元素添加到数组的首位
                this.data.comments2.unshift({
                        content: comment,
                        nums: 1
                    })
                    // 再次更新数据视图
                this.setData({
                    comments: this.data.comments,
                    //关闭遮罩层（蒙层）
                    posting: false
                })
            });

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