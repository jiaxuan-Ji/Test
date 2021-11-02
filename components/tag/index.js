// components/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    // 启动slot:
    options: {
        multipleSlots: true
    },
    externalClasses: ['tag-class'],
    properties: {
        text: String
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
            // tap是小程序内置的名称， 所以这里不要用tap， 用tapping
            this.triggerEvent('tapping', {
                text: this.properties.text
            })
        }
    }
})