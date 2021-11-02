// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
    /**
     * 组件的属性列表
     */
    // 继承组件:
    behaviors: [classicBeh],
    properties: {
        // img:String,
        // content:String
        src: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        pauseSrc: 'images/player@play.png',
        playSrc: 'images/player@pause.png',
        playing: false,
    },

    attached: function(event) {
        this._recoverStatus();
        this._monintorSwith()
    },

    detached: function(event) {
        mMgr.stop()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay: function(event) {
            if (!this.data.playing) {
                console.log(this.properties.src)
                    // 播放开始时切换图片
                this.setData({
                    playing: true
                })
                mMgr.src = this.properties.src
                mMgr.title = this.properties.title;
            } else {
                this.setData({
                    playing: false
                });
                mMgr.pause();
            }
        },
        _recoverStatus: function() {
            if (mMgr.paused) {
                this.setData({
                    playing: false
                })
                return
            }
            // 如果当前正在播放的音乐是当前期刊所显示的音乐
            if (mMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },
        _monintorSwith: function() {
            mMgr.onPlay(() => {
                this._recoverStatus()
            });
            mMgr.onPause(() => {
                this._recoverStatus()
            });
            mMgr.onStop(() => {
                this._recoverStatus()
            });
            mMgr.onEnded(() => {
                this._recoverStatus()
            });
        }
    }
})