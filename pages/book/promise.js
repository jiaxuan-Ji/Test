/*
 * @Description: 
 * @Author: 老纪
 * @Date: 2021-11-02 13:41:32
 * @LastEditTime: 2021-11-02 13:41:32
 */
Page({
    onLoad: function(options) {
        functionA().then(res => {

            })
            .then(res => {
                console.log(res, 'api的调用结果');

            })
            .then(res => {
                console.log(res);
            })
    }
})

Page({
    onLoad: function(options) {
        functionA().then(res => {
            console.log(res);
            functionB().then(res => {
                console.log(res);
            })
            functionC().then(res => {
                console.log(res);
            })
        })
    }
})


Page({
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
    }
})