/*
 * @Description: 
 * @Author: 老纪
 * @Date: 2021-11-01 17:57:20
 * @LastEditTime: 2021-11-01 17:57:56
 */
// components/book/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            //从从组件内部中拿到被绑定的id号
            const bid = this.properties.book.id
            console.log(bid, 'bid');
            // 在组件内部直接写跳转会降低这个组件的通用性;最好用 triggerEvent产生一个组件的事件，然后在页面中去监听组件的事件 
            wx.navigateTo({
                url: `/pages/book-detail/book-detail?bid=${bid}`,
            })
        }
    }
})