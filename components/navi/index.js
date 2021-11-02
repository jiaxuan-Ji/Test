/*
 * @Description:
 * @Author: 老纪
 * @Date: 2021-10-30 10:25:53
 * @LastEditTime: 2021-10-30 10:36:36
 */
// components/navi/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String, //
        first: Boolean, //指定当前期刊是否是第一期
        latest: Boolean, //指定当前期刊是否是最后一期
    },

    /**
     * 组件的初始数据
     */
    data: {
        disLeftSrc: 'images/triangle.dis@left.png',
        leftSrc: 'images/triangle@left.png',
        disRightSrc: 'images/triangle.dis@right.png',
        rightSrc: 'images/triangle@right.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //自定义事件 this.triggerEvent
        onLeft: function() {
            if (!this.properties.latest) {
                // 如果 this.properties.latest不是最新的 就触发triggerEvent事件
                this.triggerEvent('left', {}, {})
            }
        },
        onRight: function() {
            if (!this.properties.first) {
                this.triggerEvent('right', {}, {})
            }
        },
    },
})