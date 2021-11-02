/*
 * @Description:
 * @Author: 老纪
 * @Date: 2021-10-27 16:26:27
 * @LastEditTime: 2021-10-29 16:40:15
 */
// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean,
            //   value:false,
            //   observer:function(){

            //   }
        },
        count: {
            type: Number,
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        //数据绑定
        //三元表达式
        //封装性、开放性
        //① 哪些封装在内部，哪些是开放出来的 ②组件的粒度 ③非常简单的功能  非常复杂的功能

        yesSrc: 'images/like.png',
        noSrc: 'images/like@dis.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike: function (event) {
            //自定义事件
            let like = this.properties.like
            let count = this.properties.count
            count = like ? count - 1 : count + 1
            this.setData({
                count: count,
                like: !like,
            })
            // 激活
            let behavior = this.properties.like ? 'like' : 'cancel'
        //    this.triggerEvent事件第一个数据是事件的名称，第二个传递对象，
            this.triggerEvent('like', {
                behavior: behavior
            }, {})
        },
    },
})